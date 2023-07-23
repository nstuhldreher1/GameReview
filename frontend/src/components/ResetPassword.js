import './ResetPassword.css';

import { useState, useContext } from 'react';
import { RecoveryContext } from '../pages/LoginPage';

const app_name = "gamereview-debf57bc9a85";

function ResetPassword(){

    const { setPage, email } = useContext(RecoveryContext);

    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');

    // error messages
    const [noMatch, setNoMatch] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);

    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com' + route;
        }
        else{
            return 'http://localhost:3001' + route;
        }
    }

    const checkInput = (event) => {
        let isValid = true;
        
        // check for password requirements:
        // MUST have a length between 6-10 characters
        // MUST have at least one uppercase letter
        // MUST have at least one lowercase letter
        // MUST have at least one number
        // MUST have as least one special characeter

        // credit: https://regexlib.com/REDetails.aspx?regexp_id=1111
        const passRegex = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
        if (passRegex.test(newPass) === true && passRegex.test(confirmNewPass) === true) {
            // display error message to user about invalid password
            isValid = true;
            setInvalidPass(false);
        } else {
            setInvalidPass(true);
            isValid = false;
        }

        // check if passwords match
        if (newPass !== confirmNewPass) {
            setNoMatch(true);
            isValid = false;
        } else {
            setNoMatch(false);
            isValid = true;
        }

        return isValid;
    }

    async function resetPassword (event) {
        event.preventDefault();

        // check input
        if (checkInput(event) === true) {
            // fetch to change password
            try {
                const response = await fetch(buildPath('/api/resetPassword'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        newPassword: newPass
                    })
                });
    
                // if the user exists in the database, check if they're email verified
                if (response.status === 200) {  
                    setPage('');
                } else {
                    console.log('error resetting password');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
    }

    return (
        <div>
            <div className="form">
                <div className="form-inside">
                    <h1 className="form-title">Reset Password</h1>
                    <form id="reset-form">
                        <p className="form-text">New Password</p>
                        <input type="password" onChange={(e) => setNewPass(e.target.value)} className="reset-input"></input>
                        <p className="form-text">Confirm New Password</p>
                        <input type="password" onChange={(e) => setConfirmNewPass(e.target.value)} className="reset-input"></input>
                    </form>
                    <button id="reset-form-button" onClick={resetPassword}>Reset Password</button>
                </div>
                <div id="reset-errors">
                    {noMatch && <p className="error-text">Passwords do not match.</p>}
                    {invalidPass && <div><p className="error-text">Passwords are invalid. Please verify that the passwords meet these requirements: </p>
                                        <ul className="error-text">
                                            <li>Length between 6-10 characters.</li>
                                            <li>MUST have at least one uppercase letter.</li>
                                            <li>MUST have at least one lowercase letter.</li>
                                            <li>MUST have at least one digit.</li>
                                            <li>MUST have at least one special character.</li>
                                        </ul>
                                    </div>}
                </div>  
            </div>
        </div>
    );
}

export default ResetPassword;