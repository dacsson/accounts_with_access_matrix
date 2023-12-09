import {
	MDBCard,
	MDBCardBody,
	MDBCardImage
} from 'mdb-react-ui-kit'

interface ProfileProps {
	userName: string; 
	userId : string;
}

const Profile = ({userName, userId} : ProfileProps) => {
	return(
		<MDBCard className="mb-4" style={{ backgroundColor: '#0D1116', border: '1px solid #21262D' }}>
			<MDBCardBody className="text-center">
				<MDBCardImage
				  src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
				  alt="avatar"
				  className="rounded-circle"
				  style={{ width: '150px', height: '150px' }}
				  fluid 
				/>
				<br />
				<p className="text-light mb-1 mt-4 w-3 fw-bold">{userName}</p>
				<p className="text-muted mb-1 w-3 fw-bold">{userId}</p>
			</MDBCardBody>
		</MDBCard>
	)
}

export default Profile;