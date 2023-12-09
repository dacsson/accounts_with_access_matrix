import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalTitle,
  MDBModalFooter,
  MDBTable, 
  MDBTableHead, 
  MDBTableBody,	
  MDBBtn,
  MDBRadio
} from 'mdb-react-ui-kit';

interface ModalProps {
	users: Array<user>;
	// whether the modal is open or not
	roleSettingsModal : boolean;
	setRoleSettingsModal : Function;
	usersInfo: Array<Privs>;
}

const Modal = ({users, roleSettingsModal, setRoleSettingsModal, usersInfo} : ModalProps) => 
	{
	
	return(
		<MDBModal staticBackdrop open={roleSettingsModal} setopen={setRoleSettingsModal} tabIndex='-1'>
			<MDBModalDialog>
		  	<MDBModalContent style={{ backgroundColor: '#0D1116', border: '1px solid #21262D' }}>
				<MDBModalHeader style={{ backgroundColor: '#161B22', borderBottom: '1px solid #21262D'}}>
			  	<MDBModalTitle>Редактировать права доступа</MDBModalTitle>
			  	<MDBBtn className='btn-close rounded-3' color='danger' onClick={() => setRoleSettingsModal(!roleSettingsModal)} style={{ backgroundColor: 'red' }}></MDBBtn>
				</MDBModalHeader>
				
				<MDBModalBody style={{ backgroundColor: '#0D1116'}}>
			  	<MDBTable align='middle' className='text-light'>
					<MDBTableHead>
				  	<tr>
						<th scope='col'>User</th>
						<th scope='col'>Edit</th>
						<th scope='col'>Copy</th>
						<th scope='col'>Read</th>
						<th scope='col'></th>
				  	</tr>
					</MDBTableHead>
					<MDBTableBody>
					{ 
					  usersInfo.map((user : Privs, index: number) => 
					  {
					   return (
					   <>
					   <tr>
						   <th scope='row'>{users[index].name}</th>
						   <td><MDBRadio id='flexRadioCheckedDisabled' defaultChecked={user.edit == "0" ? false : true} disabled/></td>
						   <td><MDBRadio id='flexRadioCheckedDisabled' defaultChecked={user.copy == "0" ? false : true}  disabled/></td>
						   <td><MDBRadio id='flexRadioCheckedDisabled' defaultChecked={user.view == "0" ? false : true}  disabled/></td>
						   <td><MDBBtn className='rounded-1 p-1' color='link' onClick={() => setRoleSettingsModal(!roleSettingsModal)} disabled>🗑</MDBBtn></td>
						</tr>
					   </>)
					  }) 
					}
				  	{/* <tr>
						<th scope='row'>Admin</th>
						<td><MDBRadio id='flexRadioCheckedDisabled' defaultChecked disabled/></td>
						<td><MDBRadio id='flexRadioCheckedDisabled' defaultChecked disabled/></td>
						<td><MDBRadio id='flexRadioCheckedDisabled' defaultChecked disabled/></td>
						<td><MDBBtn className='rounded-1 p-1' color='link' onClick={() => setRoleSettingsModal(!roleSettingsModal)} disabled>🗑</MDBBtn></td>
				  	</tr>
				  	<tr>
						<th scope='row'>Moderator</th>
						<td><MDBRadio id='flexRadioCheckedDisabled' disabled/></td>
						<td><MDBRadio id='flexRadioCheckedDisabled' defaultChecked disabled/></td>
						<td><MDBRadio id='flexRadioCheckedDisabled' defaultChecked disabled/></td>
						<td><MDBBtn className='rounded-1 p-1' color='link' onClick={() => setRoleSettingsModal(!roleSettingsModal)} disabled>🗑</MDBBtn></td>
				  	</tr>
				  	<tr>
						<th scope='row'>User</th>
						<td><MDBRadio id='flexRadioCheckedDisabled' disabled/></td>
						<td><MDBRadio id='flexRadioCheckedDisabled' disabled/></td>
						<td><MDBRadio id='flexRadioCheckedDisabled' defaultChecked disabled/></td>
						<td><MDBBtn className='rounded-1 p-1' color='link' onClick={() => setRoleSettingsModal(!roleSettingsModal)} disabled>🗑</MDBBtn></td>
				  	</tr> */}
					</MDBTableBody>
			  	</MDBTable>
				</MDBModalBody>
	  	
				<MDBModalFooter className='justify-content-center' style={{ backgroundColor: '#0D1116', borderTop: "1px solid #21262D" }}>
			  	<MDBBtn color='success' onClick={() => setRoleSettingsModal(!roleSettingsModal)} >Save changes</MDBBtn>
				</MDBModalFooter>
		  	</MDBModalContent>
			</MDBModalDialog>
		</MDBModal>
	)
}

export default Modal;