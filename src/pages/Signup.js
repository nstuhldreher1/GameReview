import './Signup.css';
import {Link} from 'react-router-dom';
import { useState } from 'react';

// require('dotenv').config();
// import {doRegistration} from '../APIstuff/signup'

function Signup(){
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/signup', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },

            body: JSON.stringify({
                firstName,
                lastName,
                email,
                username,
                password
            }),
        })

        const data = await response.json();
        console.log(data);
    }

    return(
        <div id="signup">
            <div id="signup-inside">
                <h1 id="signup-title">Signup</h1>
                <form id="form-signup">

                    <div id="first-last">
                        <p class="form-text">First Name</p>
                        <p class="form-text">Last Name</p>
                        <input type="text" onChange={(e) => setfirstName(e.target.value)} 
                        class="form-data-small" id="signup-firstname"/>
                        <input type="text" onChange={(e) => setlastName(e.target.value)} 
                         class="form-data-small" id="signup-lastname"/>
                    </div>
                    <p class="form-text">Email</p>
                    <input type="text" onChange={(e) => setEmail(e.target.value)}
                      id="signup-email" class="form-data"/>
                    <p class="form-text">Username</p>
                    <input type = "text" onChange={(e) => setUsername(e.target.value)}  
                    id="signup-username" class="form-data"/>
                    <p class="form-text">Password</p>
                    <input type ="password" onChange={(e) => setPassword(e.target.value)} 
                     id="signup-password" class="form-data"/>
                </form>
            </div>
            <div id="button-position-signup">
                <input type = "button" onClick={registerUser}  id="signup-button" value="Signup"/>
            </div>
            <p class="form-text" id="login-prompt"><Link to='/login' id="login-link">Login</Link></p>
        </div>
    );
}

export default Signup;