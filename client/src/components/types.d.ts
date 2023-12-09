// important own types 

// user display info type 
type Info = { id: string, full_name: string, email: string, phone: string, mobile: string, address: string };

// user privilgs info
type Privs = { role: string, edit_priv: string, edit: string, copy: string, view: string };

// simple user info for profile display
type user = {id: string, name: string, role: number};

/* @ DB NOTE
	HGETALL user:1
	1) "id"
	2) "@admin"
	3) "name"
	4) "Admin"
	5) "role"
	6) "2"
	
	  HGETALL user_info:1
	   1) "id"
	   2) "@admin"
	   3) "full_name"
	   4) "Artjom"
	   5) "email"
	   6) "sda20036@gmail.com"
	   7) "phone"
	   8) "89171846394"
	   9) "mobile"
	  10) "-"
	  11) "address"
	  12) "Tatischeva"
	  
	get num_users
	"3"
	
	HGETALL role_priv:1
	 1) "role"
	 2) "2"
	 3) "edit_priv"
	 4) "1"
	 5) "edit"
	 6) "1"
	 7) "copy"
	 8) "1"
	 9) "view"
	10) "1"
@ DB NOTE */