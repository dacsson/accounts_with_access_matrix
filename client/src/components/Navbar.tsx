import {
	MDBNavbar,
	MDBBtn,
	MDBContainer,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownItem,
	MDBDropdownMenu
} from 'mdb-react-ui-kit';

interface NavbarProps {
	// array of all users
	users: Array<user>;
	// change user that ur logged in as
	handleSwitchRole: Function;
	// dropdown to see all users
	roleSettingsModal: boolean;
	setRoleSettingsModal: Function;
	canChangePrivlgs: boolean;
}

const Navbar = ({users, handleSwitchRole, roleSettingsModal, setRoleSettingsModal, canChangePrivlgs} : NavbarProps) => {
	return(
		<MDBNavbar 
		  expand='lg' 
		  className='p-3' 
		  fixed='top' 
		  style={{ backgroundColor: '#01040A', borderColor: '#1B1F26', borderBottom: '1px solid #21262D'}}>
			<MDBContainer fluid className='justify-content-start'>
			  <MDBDropdown>
				<MDBDropdownToggle color='dark' className='p-1 me-3'>Юзер</MDBDropdownToggle>
				<MDBDropdownMenu style={{ backgroundColor: '#161B22'}}>
				  { 
					users.map((user : user) => 
					{
					 return <MDBDropdownItem 
					 link id={user.id} onClick={() => handleSwitchRole(user.id as string)}>
					 {user.name}
					 </MDBDropdownItem>
					}) 
				  }
				</MDBDropdownMenu>
			  </MDBDropdown>
			  {
				canChangePrivlgs
				&&
			  	<MDBBtn color='danger' className='p-1' onClick={() => setRoleSettingsModal(!roleSettingsModal)}>Изменить права доступа</MDBBtn>
			  }
			</MDBContainer>
		</MDBNavbar>
	)
}

export default Navbar;