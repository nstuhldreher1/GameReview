import './EmailVerifyForm.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const app_name = "gamereview-debf57bc9a85";

function EmailVerifyForm(props) {
    //Dynamically sets build path for fetch
    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com' + route;
        }
        else{
            return 'http://localhost:3001' + route;
        }
    }

    // user input code
    const [code, setCode] = useState(0);

    // toggle error messages
    const [invalidCode, toggleInvalidCode] = useState(false);

    // show user that they're verified and go back to login
    const [verified, showVerified] = useState(false);

    // go to login page
    const [goToContact, setGoToContact] = useState(false);

    if (goToContact) {
        return <Navigate to="../login"/>;
    }

    // check code input for validity
    const checkCodeInput = (event) => {
        event.preventDefault();
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
            const response = await fetch(buildPath('/api/verify'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: props.username,
                    code: parseInt(code, 10),
                }),
            })
            .catch((err) => {
                console.log('rejected', err);
            });

            if (response.status === 400) {
                toggleInvalidCode(true);
            } else if (response.status === 200) {
                toggleInvalidCode(false);
                showVerified(true);
            }
        }
    }

    return (
        <div>
            {!verified && 
                <div title="emailVerifyForm" className="verify-form">
                    <div className="verify-form-inside">
                        <h1 className="verify-form-title">Verify Email Address</h1>
                        <p className="verify-form-description">We have sent a verification code to {props.userEmail}. Please enter the code you recieved below.</p>
                    </div>
                    <form id="verify-form">
                        <input type="text" inputMode="numeric" onChange={(e) => setCode(e.target.value)} id="verify-input-code"></input>
                    </form>
                    <button className="verify-form-button" onClick={verifyUser}>Verify</button>

                    {invalidCode && <p id="verify-error">Invalid Code</p>}
                </div>
            }
            {verified &&
                <div className="verify-form">
                    <div className="verify-form-inside">
                        <h1 className="verify-form-title">Great!</h1>
                        <p className="verify-form-description">Now that you are all set up, you can go ahead and log in.</p>
                        <button className="verify-form-button" onClick={() => {setGoToContact(true)}}>Back to login</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default EmailVerifyForm;