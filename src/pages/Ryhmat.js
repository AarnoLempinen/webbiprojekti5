import React from 'react';
import { AddGroupForm, ShowGroups, JoinGroup, ShowMembers} from '../components/Groups'
export default function Ryhmat(){
    return (
    <div>
        <AddGroupForm/>
        <ShowGroups />
        <ShowMembers />
    </div>
    );
}