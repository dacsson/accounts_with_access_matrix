const express = require('express')
const cors = require('cors');
const application = express()

application.use(cors())
application.use(express.json())

const client = require('redis').createClient();

application.get('/get_number_of_users', async (req, res) => {
	let num_of_users = await client.dbSize();
	console.log(client.INFO());
	res.json(num_of_users);
})

application.post('/create_users', async (req, res) => {
	await client.hSet("user:1", "id", "@admin", "name", "Admin", "role", "2");
	await client.hSet("user:2", "id", "@moder", "name", "Moderator", "role", "1");
	await client.hSet("user:3", "id", "@user", "name", "User", "role", "0");
})

application.get('/get_users', async (req, res) => {
	let users = [];
	let number_of_users = parseInt(await client.get("num_users"));
	console.log(number_of_users);
	for(let i = 1; i <= number_of_users; i++)
	{
		let user = await client.hGetAll(`user:${i}`);
		users.push(user);
		console.log(user);		
	}
	res.json(users);
})

application.get('/get_user_info', async (req, res) => {
	let user_id = parseInt(req.query.id);
	let user_info = await client.hGetAll(`user_info:${user_id}`);
	res.json(user_info);
})

application.get('/get_role_priv', async (req, res) => {
	let role_id = parseInt(req.query.role);
	let role_info = await client.hGetAll(`role_priv:${role_id}`);
	res.json(role_info);		
})

application.put('/edit_info', async (req, res) => {
	let {id, user_id, new_name, new_email, new_phone, new_mobile, new_address} = req.body;
	console.log("query to put", id, user_id, new_name, new_email, new_phone, new_mobile, new_address, "\nquery array", req.body)
	let newInfo = await client.hSet(
		`user_info:${id}`,
		{
			id: `${user_id}`, 
			full_name: `${new_name}`,
			email: `${new_email}`,
			phone: `${new_phone}`,
			mobile: `${new_mobile}`,
			address: `${new_address}`
		}
	)
	res.json(newInfo);
})

application.get('/get_key', async (req, res) => {
	let user_id = parseInt(req.query.user_id);
	let hash = req.query.hash;
	let pass = await client.hGetAll(`key:${user_id}`)
	if(hash == pass.password) {
		res.json(true);
	}
	else{
		res.json(false);
	}
})

application.listen(5000, () => {
	console.log("Server started...");
	client.connect();
})