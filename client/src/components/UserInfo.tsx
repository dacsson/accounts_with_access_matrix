import {useState, useEffect} from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBModalFooter,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBInput
} from 'mdb-react-ui-kit';

interface UserInfoProps {
	// array of all users
	users: Array<user>;
	// check if user have enough rights to see info and get it from db
	handleGetAnotherUserInfo: Function;
	userInfo: Info | undefined;
	// check if user have rights to copt info
	handleCopyInfo: Function;
	// user privlgs
	userPrivInfo: Privs | undefined;
	userId: string;
	userNumId: number;
}

const UserInfo = ({users, handleGetAnotherUserInfo, userInfo, handleCopyInfo, userPrivInfo, userId, userNumId} : UserInfoProps) => {
	
	const [newName, setNewName] = useState<string | undefined>();
	const [newEmail, setNewEmail] = useState<string | undefined>();
	const [newPhone, setNewPhone] = useState<string | undefined>();
	const [newMobile, setNewMobile] = useState<string | undefined>();
	const [newAddress, setNewAddress] = useState<string | undefined>();
	const [editMode, setEditMode] = useState(false);

	// turn on or off editing users info
	const toggleEditMode = () => {
		if(!editMode) {
			setNewName(userInfo?.full_name);
			setNewEmail(userInfo?.email);
			setNewPhone(userInfo?.phone);
			setNewAddress(userInfo?.address);
			setNewMobile(userInfo?.mobile);
		}
		setEditMode(!editMode);
	}
	
	const handleSaveChanges = () => {
		console.log(newName, newEmail, newPhone, newAddress);
		try
		{
			fetch(`http://localhost:5000/edit_info`, 
				{ 
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify
					(
						{ 
						id:`${userNumId}`,
						user_id:`${userId}`,
						new_name:`${newName}`,
						new_email:`${newEmail}`,
						new_phone:`${newPhone}`,
						new_mobile: `${newMobile}`,
						new_address:`${newAddress}` 
						}
					)
				}
			).then(
				res => res.json()
			).then(
				data => console.log(data)
			)
			setEditMode(!editMode);
			alert("Information was successfully updated!")
		} catch(e) { alert(e) }
	}
	
	return(
		<MDBCard className="mb-4" style={{ backgroundColor: '#0D1116', border: '1px solid #21262D' }}>
		  <MDBCardHeader className="text-light border-0" style={{ backgroundColor: '#161B22'}}>
			<MDBDropdown>
			  <MDBDropdownToggle color='dark' className='p-1 me-3 shadow-0' style={{ backgroundColor: '#161B22'}}>Информация о пользователе</MDBDropdownToggle>
			  <MDBDropdownMenu style={{ backgroundColor: '#161B22'}}>
				{ 
				  users.map((user : user) => 
				  {
				   return <MDBDropdownItem 
				   link id={user.id} onClick={() => handleGetAnotherUserInfo(user.id as string)}>
				   {user.name}
				   </MDBDropdownItem>
				  }) 
				}
			  </MDBDropdownMenu>
			  	{/* user is able to edit info only if he has such privlgs or if its his own info */}
			  	{
				  userPrivInfo?.edit != "0"
				  ?
			  	  <MDBBtn color={!editMode ? "primary" : "danger"} className="p-1" onClick={() => toggleEditMode()}> { !editMode ? "Редактировать" : "Отменить"}</MDBBtn>
				  :
				  userInfo?.id == userId
					&&
					<MDBBtn color={!editMode ? "primary" : "danger"} className="p-1" onClick={() => toggleEditMode()}> { !editMode ? "Редактировать" : "Отменить"}</MDBBtn>			
			  	}		  
			</MDBDropdown>
		  </MDBCardHeader>
		  <MDBCardBody>
			<MDBRow>
			  <MDBCol sm="3">
				<MDBCardText className="text-light">Full Name</MDBCardText>
			  </MDBCol>
			  <MDBCol sm="9"> 
				{
				  editMode 
				  ?
				  <MDBInput id='fname' type='text' onChange={(e) => setNewName(e.target.value)} className="p-1 text-light"
				  />
				  :
				  <MDBCardText className="text-light" onCopy={(e : any) => handleCopyInfo(e)}>{userInfo?.full_name}</MDBCardText>
				}
			  </MDBCol>
			</MDBRow>
			<hr />
			<MDBRow>
			  <MDBCol sm="3">
				<MDBCardText className="text-light">Email</MDBCardText>
			  </MDBCol>
			  <MDBCol sm="9">
				{
				  editMode 
				  ?
				  <MDBInput id='fname' type='text' onChange={(e) => setNewEmail(e.target.value)}  className="p-1 text-light"/>
				  :
				  <MDBCardText className="text-light" onCopy={(e : any) => handleCopyInfo(e)}>{userInfo?.email}</MDBCardText>
				}
			  </MDBCol>
			</MDBRow>
			<hr />
			<MDBRow>
			  <MDBCol sm="3">
				<MDBCardText className="text-light">Phone</MDBCardText>
			  </MDBCol>
			  <MDBCol sm="9">
				{
				  editMode 
				  ?
				  <MDBInput id='fname' type='text' onChange={(e) => setNewPhone(e.target.value)} className="p-1 text-light"/>
				  :
				  <MDBCardText className="text-light" onCopy={(e : any) => handleCopyInfo(e)} >{userInfo?.phone}</MDBCardText>
				}
			  </MDBCol>
			</MDBRow>
			<hr />
			<MDBRow>
			  <MDBCol sm="3">
				<MDBCardText className="text-light">Mobile</MDBCardText>
			  </MDBCol>
			  <MDBCol sm="9">
				{
				  editMode 
				  ?
				  <MDBInput id='fname' type='text' onChange={(e) => setNewMobile(e.target.value)} className="p-1 text-light"/>
				  :
				  <MDBCardText className="text-light" onCopy={(e : any) => handleCopyInfo(e)} >{userInfo?.mobile}</MDBCardText>
				}
			  </MDBCol>
			</MDBRow>
			<hr />
			<MDBRow>
			  <MDBCol sm="3">
				<MDBCardText className="text-light">Address</MDBCardText>
			  </MDBCol>
			  <MDBCol sm="9">
				{
				  editMode 
				  ?
				  <MDBInput id='fname' type='text' onChange={(e) => setNewAddress(e.target.value)} className="p-1 text-light"/>
				  :
				  <MDBCardText className="text-light" onCopy={(e : any) => handleCopyInfo(e)} >{userInfo?.address}</MDBCardText>
				}
			  </MDBCol>
			</MDBRow>
		  </MDBCardBody>
		  {
			editMode
			&&
			<MDBModalFooter className='justify-content-center p-2' style={{ backgroundColor: '#161B22', borderTop: "1px solid #21262D" }}>
			  <MDBBtn color='success' className='p-1' onClick={() => handleSaveChanges()}>Сохранить изменения</MDBBtn>
			</MDBModalFooter>
		  }
		</MDBCard>
	)
}

export default UserInfo;