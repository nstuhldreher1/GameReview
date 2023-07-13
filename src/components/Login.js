import React from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import { useState } from 'react';

function Login() {

    // inputs from the login form
    var username, password;

    const [message, setMessage] = useState('');


    const login = async event => {
        event.preventDefault();
        alert('Username: ' + username.value + ' Password: ' + password.value);
    };

    return (
        <div id="login">
            <div id="login-inside">
                <h1 id="login-title">Login</h1>

                <form id="form-login">
                    <p class="form-text">Username</p>
                    <input type = "text" id="login-username" class="form-data"
                        ref={(c) => username = c}/>
                    <p class="form-text">Password</p>
                    <input type ="password" id="login-password" class="form-data"
                        ref={(c) => password = c}/>
                </form>

            </div>
            <div id="button-position">

                <input type = "button" id="login-button" value="Login" onClick={login}/>
            </div>

            <p class="form-text" id="signup-prompt">Don't have an account? <Link to='/signup' id="signup-link">Signup</Link></p>
        </div>
    );
};

export default Login;