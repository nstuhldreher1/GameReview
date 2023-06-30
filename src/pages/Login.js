import './Login.css';
import {Link} from 'react-router-dom';

function Login(){
    return(
        <div id="login">
            <div id="login-inside">
                <h1 id="login-title">Login</h1>
                <form id="form-login">
                    <p class="form-text">Username</p>
                    <input type = "text" id="login-username" class="form-data"/>
                    <p class="form-text">Password</p>
                    <input type ="password" id="login-password" class="form-data"/>
                </form>
            </div>
            <div id="button-position">
                <input type = "button" id="login-button" value="Login"/>
            </div>
            <p class="form-text" id="signup-prompt">Don't have an account? <Link to='/signup' id="signup-link">Signup</Link></p>
        </div>
    );
}

export default Login;