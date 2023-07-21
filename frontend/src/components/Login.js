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

    // error messages for user
    const [invalidLogin, toggleInvalidLogin] = useState(false);

    // login
    const login = async event => {
        event.preventDefault();
        
        var obj = {username: username.value, password: password.value};
        var js = JSON.stringify(obj);

        // try {
        //     const response = await fetch('/api/login', {
        //         method: 'POST',
        //         body: js,
        //         headers: {'Content-Type': 'application/json'}
        //     });
            
           

        // } catch (error) {
        //     console.error('Error fetching data: ', error);
        // }

        // const data = await response.json();
        // console.log(data);
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
                    <p className="form-text">Username</p>
                    <input type = "text" id="login-username" className="form-data"
                        ref={(c) => username = c}/>
                    <p className="form-text">Password</p>
                    <input type ="password" id="login-password" className="form-data"
                        ref={(c) => password = c}/>
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