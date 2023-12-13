import { useContext, useEffect, useState } from "react";
import React from "react";
// import { LoginContext } from "./Contexts";
import { jwtToken, userData } from "./Signals";
import axios from "axios";
import '../pages/pages.css';
import { useKirjaudu } from "./Login";








function Login() {

    console.log(UserInfo);
    return (
      
      <div>
         {/* <UserInfo/>  */}
        { jwtToken.value.length === 0 && <LoginForm/> }
      </div>
      
    );

  }

  function UserInfo(){
      return(
          <div>
        {jwtToken.value ? (<h1>{userData.value?.private}</h1> ) : ( <h1>Olet vieras</h1>)}
      </div>
    )
}

  function LoginForm(){

    useKirjaudu();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [uname, setUname] = useState('');
    const [pw, setPw] = useState('');


    

    function login(){
      axios.postForm('http://localhost:3001/user/login', {uname,pw})
        .then(resp => jwtToken.value = resp.data.jwtToken )
        .catch(error => console.log(error.response.data))
    }

    function register(){
      axios.postForm('http://localhost:3001/user/register', {fname, lname, uname, pw})
      .then(resp => console.log(resp.data) )
        .catch(error => console.log(error.response.data))
        console.log("Käyttäjä lisätty")
    }

    return(
      <div class="wrapper">
            <span class="icon-close">
                <i class='bx bx-x' ></i>
            </span>
      <div class="form-box login">
                <h2>Kirjaudu</h2>
                <form action="#">
                    <div class="input-box">
                        <span class="icon">
                            <i class='bx bxs-user'></i>
                        </span>
                        <input value={uname} onChange={e => setUname(e.target.value)}/>
                        <label >Käyttäjätunnus</label>
                    </div>
                    <div class="input-box">
                        <span class="icon">
                            <i class='bx bxs-lock-alt' ></i>
                        </span>
                        <input value={pw} onChange={e => setPw(e.target.value)}/>
                        <label>Salasana</label>
                    </div>
                    <div class="remember-forgot">
                        <label><input type="checkbox"></input>
                        Muista minut</label>
                        <a href="#">Unohditko salasanan?</a>
                    </div>
                    <button onClick={login} type="submit" class="btn">Kirjaudu</button>
                    <div class="login-register">
                        <p>Eikö sinulla ole käyttäjää? <a href="#" class="register-link">Rekisteröidy</a></p>
                    </div>
                </form>
                </div>

        <div class="form-box register">
                <h2>Luo käyttäjä</h2>
                <form action="#">
                    <div class="input-box">
                        <span class="icon">
                            <i class='bx bxs-envelope' ></i>
                        </span>
                        <input value={fname} onChange={e => setFname(e.target.value)} type="text" required></input>
                        <label >Etunimi</label>
                    </div>
                    <div class="input-box">
                        <span class="icon">
                            <i class='bx bxs-envelope' ></i>
                        </span>
                        <input value={lname} onChange={e => setLname(e.target.value)} type="text" required></input>
                        <label >Sukunimi</label>
                    </div>
                    <div class="input-box">
                        <span class="icon">
                            <i class='bx bxs-user'></i>
                        </span>
                        <input value={uname} onChange={e => setUname(e.target.value)} type="text" required></input>
                        <label >Käyttäjänimi</label>
                    </div>
                    <div class="input-box">
                        <span class="icon">
                            <i class='bx bxs-lock-alt' ></i>
                        </span>
                        <input value={pw} onChange={e => setPw(e.target.value)} type="password" required></input>
                        <label >Salasana</label>
                    </div>
                    <div class="remember-forgot">
                        <label><input type="checkbox"></input>
                        Hyväksyn käyttöehdot</label>
                    </div>
                    <button onClick={register} type="submit" class="btn" >Luo käyttäjä</button>
                    <div class="login-register">
                        <p>Onko sinulla jo käyttäjä? <a href="#" class="login-link">Kirjaudu sisään</a></p>
                    </div>
                </form>
            </div>
            </div>
        
      
    );
  }

export {Login , LoginForm, UserInfo};