import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
} from 'mdb-react-ui-kit';

const Privs = ({userPrivInfo} : {userPrivInfo : Privs | undefined}) => {
	return (
		<MDBCard className="mb-5 mt-2" style={{ backgroundColor: '#0D1116', border: '1px solid #21262D' }}>
		  <MDBCardHeader className="text-light border-0" style={{ backgroundColor: '#161B22'}}>Твои привилегии</MDBCardHeader>
		  <MDBCardBody className='p-3'>
			{
			  userPrivInfo?.edit_priv != "0" 
			  &&
			  <MDBBtn color='success' disabled className='m-2'>Редактирование прав</MDBBtn> 
			}
			{
			  userPrivInfo?.edit != "0" 
			  &&
			  <MDBBtn color='success' disabled className='m-2'>Редактирование</MDBBtn> 
			}
			{
			  userPrivInfo?.copy != "0" 
			  &&
			  <MDBBtn color='success' disabled className='m-2'>Копирование</MDBBtn> 
			}
			{
			  userPrivInfo?.view != "0" 
			  &&
			  <MDBBtn color='success' disabled className='m-2'>Просмотр</MDBBtn> 
			}  
		  </MDBCardBody>
		</MDBCard>
	)
}

export default Privs;