// import Abstractview from "./Abstractview.js";
// import {UserInfo} from "../../components/Auth.js";
import { jwtToken, userData } from "./Signals";

import axios from "axios";
import React, { useState, useEffect } from 'react';

function AddGroupForm() {
  
    const [groupname, setGroupname] = useState('');
    const [groupdescription, setGroupdescription] = useState('');
    const [isAdmin, setIsAdmin] = useState('admin');
    
    
  
    async function addGroup() {
      if (jwtToken.value.length > 0) {
        try {
          const username = userData.value.username;
          
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
        <input value={groupname} onChange={e => setGroupname(e.target.value)} />
        <input value={groupdescription} onChange={e => setGroupdescription(e.target.value)} />
        <button onClick={addGroup}>Add </button>
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
        <button onClick={groupsVisible ? hideGroups : getGroups}>
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
        <input
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={joinGroup}>Join group</button>
        <ShowMembers groupname={groupname} />
      </div>
    );
  }
  
  
  function ShowMembers({ groupname }) {
    const [members, setMembers] = useState([]);
    const [membersVisible, setMembersVisible] = useState(false);
    
  
  
    if (jwtToken.value.length > 0) {
      async function getMembers() {
  
        try {
          const response = await axios.get(`http://localhost:3001/user/showmembers/?groupname=${groupname}`);
          console.log('Members:', response.data);
          setMembers(response.data);
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
              <button onClick={hideMembers}>Hide members</button>
              <ul>
                {members.map((member) => (
                  <li key={member.username}>
                    {member.username} - {member.isadmin}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <button onClick={getMembers}>Show members</button>
          )}
          
        </div>
      );
    }
  }
  
  
  
  function DeleteMember() {
  
    async function deleteMember() {
      try {
        const response = await axios.delete('http://localhost:3001/user/deletemember');
        console.log('Member deleted:', response.data);
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  
    return (
      <button onClick={deleteMember}>Delete member</button>
    );
  }
  
  
  function AcceptMember() {
   const [isAdmin, setIsAdmin] = useState('waiting');
    async function acceptMember() {
      try {
        const response = await axios.post('http://localhost:3001/user/acceptmember');
        console.log('Member accepted:', response.data);
  
        setIsAdmin('member');
  
      } catch (error) {
        console.error('Error accepting member:', error);
  
        setIsAdmin('waiting');
      }
    }
    return (
      <button onClick={acceptMember}>Accept member</button>
    );
  }
  
  function RejectMember() {
    const [isAdmin, setIsAdmin] = useState('waiting');
   
    async function rejectMember() {
  
      try {
        const response = await axios.delete('http://localhost:3001/user/rejectmember');
        console.log('Member rejected:', response.data);
      } catch (error) {
        console.error('Error rejecting member:', error);
        isAdmin('waiting');
      }
    }
    return (
      <button onClick={rejectMember}>Reject member</button>
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
          <button onClick={waitingMembersVisible ? hideWaitingMembers : getWaitingMembers}>
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
  
  export { ShowWaitingMembers, AddGroupForm, ShowGroups, JoinGroup, ShowMembers, DeleteMember, AcceptMember, RejectMember }