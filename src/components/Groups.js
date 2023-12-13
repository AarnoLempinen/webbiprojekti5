// import Abstractview from "./Abstractview.js";
// import {UserInfo} from "../../components/Auth.js";
import { jwtToken } from "./Signals";

import axios from "axios";
import React, { useState, useEffect } from 'react';

function AddGroupForm() {
    const [groupname, setGroupname] = useState('');
    const [groupdescription, setGroupdescription] = useState('');
  
  
    async function addGroup() {
      if (jwtToken.value.length > 0) {
        try {
          const response = await axios.post('http://localhost:3001/user/addgroup', { groupname, groupdescription });
          console.log('Group added:', response.data);
          
  
          setGroupname('');
          setGroupdescription('');
  
  
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
        <input className="ryhma" placeholder="Description" value={groupdescription} onChange={e => setGroupdescription(e.target.value)} />
        <button className="ryhma2" onClick={addGroup}>Add Group</button>
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
      <div >
        <button className="ryhma2" onClick={groupsVisible ? hideGroups : getGroups}>
          {groupsVisible ? 'Hide Groups' : 'Show Groups'}
        </button>
        {groupsVisible && (
          <ul className="jasenet">
            {groups.map(group => (
              <li key={group.groupname}>
                {group.groupname} - {group.groupdescription}
                <JoinGroup />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  
  function JoinGroup() {
    const [groupname, setGroupname] = useState('');
    const [username, setUsername] = useState('');
    
  
      async function joinGroup() {
        
        if (jwtToken.value.length > 0) {
          try {
            const response = await axios.post('http://localhost:3001/user/joingroup', {
              groupname,
              username,
              is_owner:false,
            });
            console.log('Group joined:', response.data);
            
      
            setGroupname('');
            setUsername('');
  
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
          className="ryhma"
            type="text"
            placeholder="Group name"
            value={groupname}
            onChange={(e) => setGroupname(e.target.value)}
          />
          <input
          className="ryhma"
            type="text"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="ryhma2" onClick={joinGroup}>Join group</button>
          
        </div>
      );
    }
  
  
  function ShowMembers() {
    const [groupname, setGroupname] = useState('');
    const [members, setMembers] = useState([]);
    const [membersVisible, setMembersVisible] = useState(false);
  
    
    if (jwtToken.value.length> 0) {
      async function getMembers() {
        
        try {
          const response = await axios.get(`http://localhost:3001/user/showmembers?groupname=${groupname}`);
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
        <div className="jasenet">
        <input
        className="ryhma"
          type="text"
          placeholder="Group name"
          value={groupname}
          onChange={(e) => setGroupname(e.target.value)}
        />
        {membersVisible ? (
          <>
            <button onClick={hideMembers}>Hide members</button>
            <ul>
              {members.map((member) => (
                <li key={member.username}>
                  {member.username} - {member.is_owner ? 'owner' : 'member'}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <button className="ryhma2" onClick={getMembers}>Show members</button>
        )}
      </div>
      );
    }
  }

  export { AddGroupForm, ShowGroups, JoinGroup, ShowMembers};