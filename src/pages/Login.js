import './Login.css';
import {Link} from 'react-router-dom';
import { useState } from 'react';

function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    async function doLogin(event) 
    {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },

            body: JSON.stringify({
                username,
                password
            }),
        })

        const data = await response.json();
        console.log(data);
    }
    return(
        <div id="login">
            <div id="login-inside">
                <h1 id="login-title">Login</h1>
                <form id="form-login">
                    <p class="form-text">Username</p>
                    <input type = "text" onChange={(e) => setUsername(e.target.value)} 
                    id="login-username" class="form-data"/>
                    <p class="form-text">Password</p>
                    <input type ="password" onChange={(e) => setPassword(e.target.value)}
                    id="login-password" class="form-data"/>
                </form>
            </div>
            <div id="button-position">
                <input type = "button" onClick={doLogin} id="login-button"  value="Login"/>
            </div>
            <p class="form-text" id="signup-prompt">Don't have an account? <Link to='/signup' id="signup-link">Signup</Link></p>
        </div>
    );
}

export default Login;