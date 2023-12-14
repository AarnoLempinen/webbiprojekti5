//Components/Group.js

import axios from "axios";
import { useState } from "react";
import { jwtToken, userData } from "./Signals";


function AddGroupForm() {
  
  const [groupname, setGroupname] = useState('');
  const [groupdescription, setGroupdescription] = useState('');
  const [isAdmin, setIsAdmin] = useState('admin');
  
  

  async function addGroup() {
    if (jwtToken.value.length > 0) {
      try {
        const username = userData.value.private;
        
        console.log(username, isAdmin);
        const response = await axios.post('http://localhost:3001/user/addgroup', {
          groupname,
          groupdescription,
          username,
          isAdmin,
        });

        console.log('Group added:', response.data);

        setGroupname('');
        setGroupdescription('');
        setIsAdmin('admin');
        

      } catch (error) {
        console.error('Error adding group:', error);
      }
    } else {
      console.log('You are not logged in.');
    }
  }

  return (
    <div>
      <input className="ryhma" placeholder="Group name" value={groupname} onChange={e => setGroupname(e.target.value)} />
      <input className="ryhma" placeholder="Description"  value={groupdescription} onChange={e => setGroupdescription(e.target.value)} />
      <button className="ryhma2" onClick={addGroup}>Add </button>
    </div>
  );
}


function ShowGroups() {
  const [groups, setGroups] = useState([]);
  const [groupsVisible, setGroupsVisible] = useState(false);

  async function getGroups() {
    try {
      const response = await axios.get('http://localhost:3001/user/showgroups');
      console.log('Groups:', response.data);


      setGroups(response.data);
      setGroupsVisible(true);


    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  const hideGroups = () => {
    setGroupsVisible(false);
    setGroups([]);
  };

  return (
    <div>
      <button className="ryhma2" onClick={groupsVisible ? hideGroups : getGroups}>
        {groupsVisible ? 'Hide Groups' : 'Show Groups'}
      </button>
      {groupsVisible && (
        <ul>
          {groups.map(group => (
            <li key={group.groupname}>
              {group.groupname} - {group.groupdescription}
              <JoinGroup groupname={group.groupname} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function JoinGroup({ groupname }) {
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState('waiting');

  async function joinGroup() {

    if (jwtToken.value.length > 0) {
      try {
        const response = await axios.post('http://localhost:3001/user/joingroup', {
          groupname,
          username,
          isAdmin,
        });

        console.log(`User ${username} joined waiting room for group ${groupname}`, response.data);

        setUsername('');
        setIsAdmin('waiting');


      } catch (error) {
        console.error('Error joining group:', error);
      }
    } else {
      console.log('You are not logged in.');
    }
  }



  return (
    <div>
      <input className="ryhma"
        type="text"
        placeholder="Your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="ryhma2" onClick={joinGroup}>Join group</button>
      <ShowMembers groupname={groupname} />
    </div>
  );
}




function ShowMembers({ groupname }) {
  const [members, setMembers] = useState([]);
  const [membersVisible, setMembersVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null)

  const checkIsAdmin = (data) => {


    let correctMember = 0

    data.forEach((member) => {
      //console.log(member.username)
      //console.log(userData.value?.username)

      if (member.username === userData.value?.private) {
        console.log(member)
        correctMember = member
      }
    })


    if (correctMember.isadmin === 'admin'){
      setIsAdmin(true)
    }
  }

  


  if (jwtToken.value.length > 0) {
    async function getMembers() {

      try {
        const response = await axios.get(`http://localhost:3001/user/showmembers/?groupname=${groupname}`);
        console.log('Members:', response.data);
        setMembers(response.data);
        //console.log(members)
        checkIsAdmin(response.data)
        setMembersVisible(true);
      } catch (error) {
        console.error('Error fetching members:', error.response);
        setMembersVisible(false);
        setMembers([]);
      }

    }

    const hideMembers = () => {
      setMembersVisible(false);
      setMembers([]);
    };

    return (
      <div>

        {membersVisible ? (
          <>
            <button className="ryhma2" onClick={hideMembers}>Hide members</button>
            <ul>
              {members.map((member) => {
                //console.log(userData.value?.username)

                if (isAdmin) {

                  if (member.isadmin === 'waiting') {
                    return (
                      <li key={member.username}>
                        {member.username} - {member.isadmin}
                        <AcceptMember groupname={groupname} username={member.username} /> <RejectMember groupname={groupname} username={member.username}/>
                      </li>
                    )

                  } else if (member.isadmin === 'member') {
                    return (
                      <li key={member.username}>
                        {member.username} - {member.isadmin}
                        <DeleteMember groupname={groupname} username={member.username}/>
                      </li>
                    )

                  } else if (member.isadmin === 'admin') {
                    return (
                      <li key={member.username}>
                        {member.username} - {member.isadmin}
                      </li>
                    )

                  }
                  return (
                    <li key={member.username}>
                      {member.username} - {member.isadmin}
                    </li>
                  )
                }
                else {
                  return (
                    <li key={member.username}>
                      {member.username} - {member.isadmin}
                    </li>
                  ) 
                }
                })}
            </ul>
          </>
        ) : (
          <button className="ryhma2" onClick={getMembers}>Show members</button>
        )}
        
      </div>
    );
  }
}



function DeleteMember({groupname, username}) {


  async function deleteMember() {

    try {
      const response = await axios.delete(`http://localhost:3001/user/deletemember/${groupname}/${username}`,);
      console.log('Member deleted:', response.data);
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  }

  return (
    <button className="ryhma2" onClick={deleteMember}>Delete member</button>
  );
}


function AcceptMember({groupname, username}) {
 const [isAdmin, setIsAdmin] = useState('waiting');
 const data = {
  groupname: groupname,
  username: username
 }

  async function acceptMember() {
    try {
      const response = await axios.post('http://localhost:3001/user/acceptmember', data);
      console.log('Member accepted:', response.data);

      setIsAdmin('member');

    } catch (error) {
      console.error('Error accepting member:', error);

      setIsAdmin('waiting');
    }
  }
  return (
    <button className="ryhma2" onClick={acceptMember}>Accept member</button>
  );
}

function RejectMember({groupname, username}) {
  const [isAdmin, setIsAdmin] = useState('waiting');

  const data = {
    groupname: groupname,
    username: username
   }
 
  async function rejectMember() {

    try {
      const response = await axios.post('http://localhost:3001/user/rejectmember', data);
      console.log('Member rejected:', response.data);
    } catch (error) {
      console.error('Error rejecting member:', error);
      setIsAdmin('waiting');
    }
  }
  return (
    <button className="ryhma2" onClick={rejectMember}>Reject member</button>
  );
}



function ShowWaitingMembers() {
  
  const [isAdmin, setIsAdmin] = useState('admin');
  const [waitingMembers, setWaitingMembers] = useState([]);
  const [waitingMembersVisible, setWaitingMembersVisible] = useState(false);


  async function getWaitingMembers() {
    try {
      const response = await axios.get('http://localhost:3001/user/showwaitingmembers');
      console.log('Waiting members:', response.data);
      setWaitingMembers(response.data);
      setWaitingMembersVisible(true);
    } catch (error) {
      console.error('Error fetching waiting members:', error);
    }
  }

  const hideWaitingMembers = () => {
    setWaitingMembersVisible(false);
    setWaitingMembers([]);
  }


  return (
    <div>
      {isAdmin === 'admin' ? (
        <button className="ryhma2" onClick={waitingMembersVisible ? hideWaitingMembers : getWaitingMembers}>
          {waitingMembersVisible ? 'Hide waiting members' : 'Show waiting members'}
        </button>
      ) : (
        <p>You don't have admin rights.</p>
      )}

      {waitingMembersVisible && isAdmin === 'admin' && (
        <ul>
          {waitingMembers.map(waitingMember => (
            <li key={waitingMember.username}>
              {waitingMember.username} - {waitingMember.groupname}
              <AcceptMember/> <RejectMember/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { ShowWaitingMembers, AddGroupForm, ShowGroups, JoinGroup, ShowMembers, DeleteMember, AcceptMember, RejectMember };