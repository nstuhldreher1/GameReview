import './Otp.css';
import { RecoveryContext } from '../pages/LoginPage';
import { useContext } from 'react';
import { useState } from 'react';

function Otp() {
    const { email, setPage, setOTP, otp } = useContext(RecoveryContext);

    const [invalidCode, toggleInvalidCode] = useState(false);

    // check otp input for validity
    const checkCodeInput = (event) => {
        event.preventDefault();
        let isValid = true;

        console.log(otp);
        // check if code is six digits only
        const codeRegex = /^\d{4}$/;
        if (codeRegex.test(otp) === false) {
            // display error message to user about invalid code
            isValid = false;
            toggleInvalidCode(true);
        } else {
            toggleInvalidCode(false);
        }

        return isValid;
    }

    async function otpUser (event) {
        event.preventDefault();

        // check to see if the form input is valid
        // if it is, create the account
        if (checkCodeInput(event) === true) {

            // call signup API to create user
            const response = await fetch('http://localhost:3001/api/verifyOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    otp: parseInt(otp, 10),
                }),
            })
            .catch((err) => {
                console.log('rejected', err);
            });

            if (response.status === 400) {
                toggleInvalidCode(true);
            } else if (response.status === 200) {
                toggleInvalidCode(false);
                setPage('reset');
            }
        }
    }

    return (
        <div>
             <div className="form">
                <div className="form-inside">
                    <h1 className="form-title">Request Password Reset</h1>
                    <p className="form-description">We have sent an email reset code to {email}. Please enter the code from the email below.</p>
                </div>
                <form id="otp-form">
                    <input type="text" inputMode="numeric" onChange={(e) => setOTP(e.target.value)} id="otp-input-code"></input>
                </form>
                <button className="otp-form-button" onClick={otpUser}>Confirm</button>

                {invalidCode && <p id="otp-error">Invalid Code</p>}
            </div>
        </div>
    );
}

export default Otp;