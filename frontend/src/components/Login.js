import React from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { RecoveryContext } from '../pages/LoginPage';
import { Navigate } from 'react-router-dom';

import EmailVerifyForm from '../components/EmailVerifyForm';

const app_name = "gamereview-debf57bc9a85";

function Login() {
    //Dynamically sets build path for fetch
    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com' + route;
        }
        else{
            return 'http://localhost:3001' + route;
        }
    }

    const { setPage } = useContext(RecoveryContext);

    const [email, setEmail] = useState('');

    // inputs from the login form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // error messages for user
    const [invalidLogin, toggleInvalidLogin] = useState(false);
    
    // go to feed page
    const [goToProfile, setGoToProfile] = useState(false);

    const [showVerifyForm, setShowVerifyForm] = useState(false);

    if (goToProfile) {
        return <Navigate to="../profile"/>;
    }

    // login
    const login = async event => {
        event.preventDefault();

        try {
            const response = await fetch(buildPath('/api/login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();
            setEmail(data.email);

            // if the user exists in the database, check if they're email verified
            if (response.status === 200) {
                toggleInvalidLogin(false);

                if (data.isConfirmed) {
                    setGoToProfile(true);
                } else if (data.isConfirmed === false) {
                    setShowVerifyForm(true);
                }

            } else {
                toggleInvalidLogin(true);
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    // display forgot password form
    function goToForgotPassword() {
        setPage("forgot");
    }

    return (
        <div>
            <div id="login">
                <div id="login-inside">
                    <h1 id="login-title">Login</h1>
                    <form id="form-login">
                        <p className="form-text">Username</p>
                        <input type = "text" id="login-username" className="form-data"
                            onChange={(e) => setUsername(e.target.value)}/>
                        <p className="form-text">Password</p>
                        <input type ="password" id="login-password" className="form-data"
                            onChange={(e) => setPassword(e.target.value)}/>
                    </form>
                </div>

                <div id="incorrect-info">
                    {invalidLogin && <p id="incorrect-info-text">Invalid Username/Password</p>}
                </div>

                <div id="forgot-password">
                    <a id="forgot-password-text" href ="#" onClick={() => goToForgotPassword()}>Forgot Password?</a>
                </div>

                <div id="button-position">

                    <input type = "button" id="login-button" value="Login" onClick={login}/>
                </div>

                <p className="form-text" id="signup-prompt">Don't have an account? <Link to='/signup' id="signup-link">Signup</Link></p>
            </div>
            {showVerifyForm && <EmailVerifyForm userEmail= {email} username = {username}/>}
        </div>
        
    );
};

export default Login;