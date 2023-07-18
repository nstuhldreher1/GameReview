import React from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { RecoveryContext } from '../pages/LoginPage';

function Login() {
    const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);

    // inputs from the login form
    var username, password;

    const [message, setMessage] = useState('');

    // login
    const login = async event => {
        event.preventDefault();
        
        var obj = {username: username.value, password: password.value};
        var js = JSON.stringify(obj);

        const response = await fetch('http://localhost:3001/login-api', 
            {method: 'POST', body: js, headers:{'Content-Type': 'application/json'}});
            
        var result = JSON.parse(await response.text());

        if(response.id <= 0) {
            setMessage('Username or Password is incorrect');
        } else {
            // get the name and email from api
            var user = {name: result.name, email: result.email};

            // store the info for later use
            localStorage.setItem('user_data', JSON.stringify(user));

            // no error so blank out message
            setMessage('');

            // direct user to feed page
            window.location.href = '/Feed';
        }
    };

    // check if the user is verified. If not, do email verification
    

    // display forgot password form
    function goToForgotPassword() {
        setPage("forgot");
    }

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

            <div id="incorrect-info">
                <p id="incorrect-info-text">{message}</p>
            </div>

            <div id="forgot-password">
                <a id="forgot-password-text" href ="#" onClick={() => goToForgotPassword()}>Forgot Password?</a>
            </div>

            <div id="button-position">

                <input type = "button" id="login-button" value="Login" onClick={login}/>
            </div>

            <p class="form-text" id="signup-prompt">Don't have an account? <Link to='/signup' id="signup-link">Signup</Link></p>
        </div>
    );
};

export default Login;

// from the now deleted 'pages/login.js'

// import './Login.css';
// import {Link} from 'react-router-dom';
// import { useState } from 'react';

// function Login(){

//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');


//     async function doLogin(event) 
//     {
//         event.preventDefault();
//         const response = await fetch('http://localhost:3001/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',

//             },

//             body: JSON.stringify({
//                 username,
//                 password
//             }),
//         })

//         const data = await response.json();
//         console.log(data);
//     }
//     return(
//         <div id="login">
//             <div id="login-inside">
//                 <h1 id="login-title">Login</h1>
//                 <form id="form-login">
//                     <p class="form-text">Username</p>
//                     <input type = "text" onChange={(e) => setUsername(e.target.value)} 
//                     id="login-username" class="form-data"/>
//                     <p class="form-text">Password</p>
//                     <input type ="password" onChange={(e) => setPassword(e.target.value)}
//                     id="login-password" class="form-data"/>
//                 </form>
//             </div>
//             <div id="button-position">
//                 <input type = "button" onClick={doLogin} id="login-button"  value="Login"/>
//             </div>
//             <p class="form-text" id="signup-prompt">Don't have an account? <Link to='/signup' id="signup-link">Signup</Link></p>
//         </div>
//     );
// }

// export default Login;