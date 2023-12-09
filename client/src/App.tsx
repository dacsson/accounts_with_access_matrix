import {useState, useEffect} from 'react';
import './App.css';

// import components 
import KeyModal from './components/KeyModal';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import UserInfo from './components/UserInfo';
import Privs from './components/Privs';

// import ui components
import {
  MDBCol,
  MDBContainer,
  MDBRow,
} from 'mdb-react-ui-kit';

function App() {
  const [roleSettingsModal, setRoleSettingsModal] = useState(false);
  const [users, setUsers] = useState<Array<user>>([]);
  const [userNumId, setUserNumId] = useState<number>(1);
  const [userId, setUserId] = useState<string>("@nobody");
  const [userName, setUserName] = useState<string>("Nobody");
  const [userInfo, setUserInfo] = useState<Info>();
  const [userToView, setUserToView] = useState<number>(0);
  const [userPrivInfo, setUserPrivInfo] = useState<Privs>();  
  const [usersInfo, setUsersInfo] = useState<Array<Privs>>([]);
    
  // check privlgs of user and get another user info
  const handleGetAnotherUserInfo = (id: string) => {
    if(userPrivInfo?.view != "0")
    {
      // Retrieving another user info
      let count = 1;
      users.map((user : user) => {
        if(user.id == id) {
          setUserToView(count);
          fetch(`http://localhost:5000/get_user_info?id=${count}`).then(
            res => res.json()
          ).then(
            data => {
              setUserInfo(data)
              console.log(data)
            }
          );
        }
        count++;
      })
      console.log("\nyou are viewing ", id);
    }
    else {
      alert("Not enough privilliges!");
    }
  }
  
  // check privgs for copying info
  const handleCopyInfo = (e : any) => {
    if(userPrivInfo?.copy == "0")
    {
      e.preventDefault();
      alert("Not enough privilliges!")
      return false;      
    }
  }
  
  // log in as another user
  const handleSwitchRole = (id : string) => {
    setRoleSettingsModal(true);
    setUserId(id);
    //setUserInfo(new Array());
    console.log("id : ", userId);
    let count = 1;
    users.map((user : user) => {
      if(user.id == id) {
        setUserNumId(count);
        setUserName(user.name);
        console.log("found user", user)
        
        // Get user info
        fetch(`http://localhost:5000/get_user_info?id=${count}`).then(
          res => res.json()
        ).then(
          data => {
            setUserInfo(data)
            console.log(data)
          }
        )
        // Get user privilleges
        fetch(`http://localhost:5000/get_role_priv?role=${user.role}`).then(
          res => res.json()
        ).then(
          data => {
            setUserPrivInfo(data)
            console.log("privs: ", data);
          }
        )
      }
      count++;
    })
    
    console.log("\nyou are now ", id);
  }
  
  useEffect(() => {
    fetch("http://localhost:5000/get_users").then(
      res => res.json()
    ).then(
      data => {
        setUsers(data)
        console.log(data)
      }
    )
  }, [])
  
  return (
    <section style={{ backgroundColor: '#0D1116', color: 'white', height: "100%" }}>
      
      {/* Modal with settings */}
      {/* <Modal roleSettingsModal={roleSettingsModal} setRoleSettingsModal={setRoleSettingsModal} users={users} usersInfo={usersInfo}/> */}
      {/* Modal with password */}
      <KeyModal userId={userNumId} roleSettingsModal={roleSettingsModal} setRoleSettingsModal={setRoleSettingsModal} />
      {/* Navigation bar */}
      <Navbar users={users} handleSwitchRole={handleSwitchRole} roleSettingsModal={roleSettingsModal} setRoleSettingsModal={setRoleSettingsModal} canChangePrivlgs={false}/>
      
      {/* Main content */}
      <MDBContainer className="py-5 mt-4">
        <MDBRow>
          <MDBCol lg="4">
            
            {/* Card for profile avatar and actions */}
            <Profile userName={userName} userId={userId}/>
          
          </MDBCol>
          <MDBCol lg="8">
            
            {/* Card with important selected info */}
            <UserInfo users={users} handleGetAnotherUserInfo={handleGetAnotherUserInfo} userInfo={userInfo} handleCopyInfo={handleCopyInfo} userPrivInfo={userPrivInfo} userId={userId} userNumId={userToView}/>
            
            <MDBRow>
              <MDBCol>
                
                {/* Card showing which rights do u have */}
                <Privs userPrivInfo={userPrivInfo} />
              
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default App;
