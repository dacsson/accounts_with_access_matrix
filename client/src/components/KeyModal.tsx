import {useState, useEffect} from 'react';
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
  MDBRadio,
  MDBInput
} from 'mdb-react-ui-kit';
import encryptByPlayfairCipher from './PlayfairCipher';

interface KeyModalProps {
	userId: number;
	// whether the modal is open or not
	roleSettingsModal : boolean;
	setRoleSettingsModal : Function;
}

const KeyModal = ({userId, roleSettingsModal, setRoleSettingsModal} : KeyModalProps) => 
	{
	
	const [userPass, setUserPass] = useState<string>("");
	
	const checkPass = () => {
		fetch(`http://localhost:5000/get_key?user_id=${userId-1}&hash=${encryptByPlayfairCipher(userPass, "LAPTEV")}`).then(
		  res => res.json()
		).then(
		  data => {
			if(data)
			{
				setRoleSettingsModal(false);
			}
			else{
				alert("Wrong password!");
			}
			console.log(data, userPass, userId)
		  }
		)
		console.log(encryptByPlayfairCipher(userPass, "LAPTEV"));
	}
	
	return(
		<MDBModal staticBackdrop open={userId != 4? roleSettingsModal : false} setopen={setRoleSettingsModal} tabIndex='-1'>
			<MDBModalDialog centered>
			  <MDBModalContent style={{ backgroundColor: '#0D1116', border: '1px solid #21262D'}}>
				<MDBModalHeader style={{ backgroundColor: '#161B22', borderBottom: '1px solid #21262D'}}>
				  <MDBModalTitle>Введите пароль</MDBModalTitle>
				  {/* <MDBBtn className='btn-close rounded-3' color='danger' onClick={() => setRoleSettingsModal(!roleSettingsModal)} style={{ backgroundColor: 'red' }}></MDBBtn> */}
				</MDBModalHeader>
				
				<MDBModalBody style={{ backgroundColor: '#0D1116'}}>
				  <MDBInput label='Пароль' id='form1' type='text' onChange={(e) => setUserPass(e.target.value)}/>
				</MDBModalBody>
		  
				<MDBModalFooter className='justify-content-center' style={{ backgroundColor: '#0D1116', borderTop: "1px solid #21262D" }}>
				  <MDBBtn color='success' onClick={() => checkPass()} >Перейти</MDBBtn>
				</MDBModalFooter>
			  </MDBModalContent>
			</MDBModalDialog>
		</MDBModal>
	)
}

export default KeyModal;