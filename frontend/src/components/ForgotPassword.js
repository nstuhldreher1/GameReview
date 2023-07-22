import './ForgotPassword.css';

import { useContext } from 'react'; 
import { RecoveryContext } from '../pages/LoginPage';

function ForgotPassword(){
    const { setPage, setEmail, email } = useContext(RecoveryContext);

    async function requestPass(event) {
        event.preventDefault();

        // call signup API to create user
        const response = await fetch('http://localhost:3001/api/requestPassReset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            }),
        });

        if (response.status === 200) {
            setPage("otp");
        }

    }


    return (
        <div id="forgot">
            <div id="forgot-inside">
                <h1 id="forgot-title">Forgot Password</h1>
                <p id="forgot-description">To begin resetting your password, enter your email below.</p>
                <form id="form-forgot">
                    <p className="form-text">Email</p>
                    <input type="text" onChange={(e) => setEmail(e.target.value)}></input>
                </form>
            </div>


            <div id="button-position">
                <input type="button" id="forgot-button" value="Request Password Reset" onClick={requestPass} />
            </div>
        </div>
    );
}

export default ForgotPassword;