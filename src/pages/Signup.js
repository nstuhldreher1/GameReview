import './Signup.css';
import {Link} from 'react-router-dom';

function Signup(){
    return(
        <div id="signup">
            <div id="signup-inside">
                <h1 id="signup-title">Signup</h1>
                <form id="form-signup">
                    <div id="first-last">
                        <p class="form-text">First Name</p>
                        <p class="form-text">Last Name</p>
                        <input type="text" class="form-data-small" id="signup-firstname"/>
                        <input type="text" class="form-data-small" id="signup-lastname"/>
                    </div>
                    <p class="form-text">Email</p>
                    <input type="text" id="signup-email" class="form-data"/>
                    <p class="form-text">Username</p>
                    <input type = "text" id="signup-username" class="form-data"/>
                    <p class="form-text">Password</p>
                    <input type ="password" id="signup-password" class="form-data"/>
                </form>
            </div>
            <div id="button-position-signup">
                <input type = "button" id="signup-button" value="Signup"/>
            </div>
            <p class="form-text" id="login-prompt"><Link to='/login' id="login-link">Login</Link></p>
        </div>
    );
}

export default Signup;