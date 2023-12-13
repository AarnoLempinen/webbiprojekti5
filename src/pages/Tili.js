import React from 'react';
import {jwtToken ,userData } from '../components/Signals'
import axios from "axios";



export default function Tili(){

    function deleteUser () {
        try {
            axios.delete(`http://localhost:3001/user/poista/${userData.value?.private}`);
            console.log("Käyttäjä poistettu");
            alert('Käyttäjä poistettu');
            jwtToken.value = '';
            // URL = "http://loalhost:3000";
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
    <div>
        <h1 class="kayttaja">Tervetuloa {userData.value?.private}</h1>
        <a href='/'><button class="poista_nappi" onClick={deleteUser}> Poista käyttäjä </button></a>
    </div>
    );
}