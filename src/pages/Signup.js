import './Signup.css';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

// require('dotenv').config();
// import {doRegistration} from '../APIstuff/signup'

function Signup(){
    // first/last name useStates to be concatenated later
    const [firstName, setFN] = useState('');
    const [lastName, setLN] = useState('');

    // error message toggles for user
    const [missingField, toggleMissingField] = useState(false);
    const [invalidEmail, toggleInvalidEMail] = useState(false);
    const [invalidPass, toggleInvalidPass] = useState(false);

    // to be sent to API
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const app_name = 'GameReview'
    
    //Dynamically sets build path for fetch
    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com/' + route;
        }
        else{
            return 'http://localhost:3001/' + route;
        }
    }

    // concat both the first and last name into name useState
    // used to update the name useState
    useEffect(() => {
        setName(name => firstName + " " + lastName);
    }, [firstName, lastName, name]);

    // initially set to false to hide form
    // once the user's information is valid from signup,
    // set to true to show email verification as the next step
    // complete the verify step to hide form
    const [showVerifyForm, setShowVerifyForm] = useState(false);

    const checkInput = (event) => {
        let isValid = true;

        // check for empty input for first name
        // check for empty input for last name
        // check for empty input for email
        // check for proper email format
        // check for empty input for username
        // check for empty input for password
        if (firstName.length === 0 || lastName.length === 0 || email.length === 0 ||
            username.length === 0 || password.length === 0) {
                // display error message to user about missing fields
                isValid = false;
                toggleMissingField(true);
        } else {
            toggleMissingField(false);
        }
        
        // email is valid for these reasons:
        // can use any uppercase
        // can use any lowercase
        // can use digits 0-9
        // can use these special characters: !#$%&'*+-/=?^_`{|}~
        // can use "." as long as it is not the first/last character in the local part

        // credit: https://regexlib.com/REDetails.aspx?regexp_id=2558
        const emailRegex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
        if (emailRegex.test(email) === false) {
            // display error message to user about invalid email
            isValid = false;
            toggleInvalidEMail(true);
        } else {
            toggleInvalidEMail(false);
        }
        
        // check for password requirements:
        // MUST have a length between 6-10 characters
        // MUST have at least one uppercase letter
        // MUST have at least one lowercase letter
        // MUST have at least one number
        // MUST have as least one special characeter

        // credit: https://regexlib.com/REDetails.aspx?regexp_id=1111
        const passRegex = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
        if (passRegex.test(password) === false) {
            // display error message to user about invalid password
            isValid = false;
            toggleInvalidPass(true);
        } else {
            toggleInvalidPass(false);
        }

        return isValid;
    }

    async function registerUser(event) {
        event.preventDefault();

        // check to see if the form input is valid
        // if it is, create the account
        if (checkInput(event) === true) {

            // call signup API to create user
            const response = await fetch(buildPath('/signup'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    username: username,
                    password: password
                }),
            })
            if (response === 409) {
                console.log("User already taken");
            } else if (response.ok) {
                var res = JSON.parse(await response.text());
                console.log("User account creation successful.");

                // proceed to verification step
                setShowVerifyForm(currentShowVerifyForm => currentShowVerifyForm = true);
            }
        }
    }

    return(
        <div>
            <div id="signup">
                <div id="signup-inside">
                    <h1 id="signup-title">Signup</h1>
                    <form id="form-signup">

                        <div id="first-last">
                            <p class="form-text">First Name</p>
                            <p class="form-text">Last Name</p>
                            <input type="text" onChange={(e) => setFN(e.target.value)}
                            class="form-data-small" id="signup-firstname"/>
                            <input type="text" onChange={(e) => setLN(e.target.value)} 
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
                    <input type = "button" onClick={registerUser} class="formButton" id="signup-button" value="Signup"/>
                </div>
                <p class="form-text" id="login-prompt"><Link to='/login' id="login-link">Login</Link></p>

                {/* error message section for user */}
                <div id="signup-errors">
                    {missingField && <p class="error-text">Please fill out all fields.</p>}
                    {invalidEmail && <p class="error-text">Email invalid. Please check that the email is formatted correctly.</p>}
                    {invalidPass && <div><p class="error-text">Password invalid. Please verify that the password meets these requirements: </p>
                                        <ul class="error-text">
                                            <li>Length between 6-10 characters.</li>
                                            <li>MUST have at least one uppercase letter.</li>
                                            <li>MUST have at least one lowercase letter.</li>
                                            <li>MUST have at least one digit.</li>
                                            <li>MUST have at least one special character.</li>
                                        </ul>
                                    </div>}
                </div>
            </div>
            {showVerifyForm && 
                <div id="verify">
                    <div id="verify-inside">
                        <h1 id="verify-title">Verify Email Address</h1>
                        <p id="verify-description">We have sent an email to {email}. Follow the instructions on that email to proceed with account creation.</p>
                    </div>
                </div>}
        </div>
    );
}

export default Signup;