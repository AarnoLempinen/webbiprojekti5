import React from 'react';
import { Login } from './Auth';
import { jwtToken } from './Signals';

let nappi = "Kirjaudu";
let Tili ="";

export default function NavBar(){

    if(jwtToken.value.length === 0 )
      {   nappi="Kirjaudu";
      Tili = "";   
    }
      
  else
  {   nappi="Kirjaudu ulos";
  Tili = "Tili";    
}

    return (
        <header>
        
        <h2 className="logo">Elokuvasovellus</h2>
        <nav className="navigation">
        <input type="checkbox" id="check"></input>
        <label for="check" className="checkbtn">
        <i className="fas fa-bars">≡</i>
        </label>
        <ul>
            <a href="/" className="nav__link" data-link>Koti</a>
            <a href="/uutiset" className="nav__link" data-link>Uutiset</a>
            <a href="/ryhmat" className="nav__link" data-link>Ryhmät</a>
            <a href="/arvostelut" className="nav__link" data-link>Arvostelut</a>
            <a href="/tili" className="nav__link" data-link>{Tili}</a>
            
           { jwtToken.value.length === 0 ? <button  className="btnLogin-popup">{nappi}</button>
            : <button  className="btnLogin-popup" onClick={() => jwtToken.value = ''}>{nappi}</button>}
             
    <Login/>
    </ul>
        </nav> 
    </header>
    );
}