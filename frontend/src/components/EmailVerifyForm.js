import './EmailVerifyForm.css';
import { useState } from 'react';

function EmailVerifyForm(props) {

    // user input code
    const [code, setCode] = useState(0);

    // toggle error messages
    const [invalidCode, toggleInvalidCode] = useState(false);

    // check code input for validity
    const checkCodeInput = (event) => {
        let isValid = true;

        console.log(code);
        // check if code is six digits only
        const codeRegex = /^\d{6}$/;
        if (codeRegex.test(code) === false) {
            // display error message to user about invalid code
            isValid = false;
            toggleInvalidCode(true);
        } else {
            toggleInvalidCode(false);
        }

        return isValid;
    }

    // verify the user
    async function verifyUser(event) {
        event.preventDefault();

        // check to see if the form input is valid
        // if it is, create the account
        if (checkCodeInput(event) === true) {

            // call signup API to create user
            const response = await fetch('http://localhost:3001/verify-api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: props.username,
                    code: code,
                }),
            })
            .then((response) => {
                console.log('resolved', response);
            })
            .then (data => {

            })
            .catch((err) => {
                console.log('rejected', err);
            });
        }
    }

    return (
        <div id="verify">
            <div id="verify-inside">
                <h1 id="verify-title">Verify Email Address</h1>
                <p id="verify-description">We have sent a verification code to {props.userEmail}. Please enter the code you recieved below.</p>
            </div>
            <form id="verify-form">
                <input type="number" onChange={(e) => setCode(e.target.value)} id="verify-input-code"></input>
            </form>
            <button id="verify-button" onClick={verifyUser}>Verify</button>

            {invalidCode && <p id="verify-error">Invalid Code</p>}
        </div>
    );
}

export default EmailVerifyForm;