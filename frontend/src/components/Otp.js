import './Otp.css';
import { RecoveryContext } from '../pages/LoginPage';
import { useContext } from 'react';
import { useState } from 'react';

const app_name = "gamereview-debf57bc9a85";

function Otp() {

    //Dynamically sets build path for fetch
    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com' + route;
        }
        else{
            return 'http://localhost:3001' + route;
        }
    }

    const { setPage, email } = useContext(RecoveryContext);
    const [invalidCode, toggleInvalidCode] = useState(false);

    const [otp, setOTP] = useState('');

    // check otp input for validity
    const checkCodeInput = (event) => {
        event.preventDefault();
        let isValid = true;

        console.log(otp);
        // check if code is six digits only
        const codeRegex = /^\d{6}$/;
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
            try {
                const response = await fetch(buildPath('/api/verifyOtp'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        otp: parseInt(otp, 10),
                    }),
                });

                const data = response.json();
    
                if (response.status === 400) {
                    toggleInvalidCode(true);
                } else if (response.status === 200) {
                    toggleInvalidCode(false);
                    setPage('reset');
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
                    <h1 className="form-title">Request Password Reset</h1>
                    <p className="form-description">Please check your email and enter the reset code below.</p>
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