import './ForgotPassword.css';

import { useContext } from 'react'; 
import { RecoveryContext } from '../pages/LoginPage';
import { useState } from 'react';

const app_name = "gamereview-debf57bc9a85";

function ForgotPassword(){
    //Dynamically sets build path for fetch
    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com' + route;
        }
        else{
            return 'http://localhost:3001' + route;
        }
    }

    const { setPage, setEmail } = useContext(RecoveryContext);
    const [tempEmail, setTempEmail] = useState('');

    function goToOtp() {
        setPage('otp');
    }

    async function requestPass(event) {
        event.preventDefault();
        console.log('request password');
        console.log(tempEmail);

        try {

            const response = await fetch(buildPath('/api/requestPassReset'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: tempEmail
                })
            });

            setEmail(tempEmail);
            if (response.status === 200) {
                console.log('email sent');
                goToOtp();
            }

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    return (
        <div id="forgot">
            <div title="forgotForm" id="forgot-inside">
                <h1 id="forgot-title">Forgot Password</h1>
                <p id="forgot-description">To begin resetting your password, enter your email below.</p>
                <form id="form-forgot">
                    <p className="form-text">Email</p>
                    <input type="text" className="form-data" onChange={(e) => setTempEmail(e.target.value)}></input>
                </form>
            </div>


            <div id="button-position">
                <input type="button" id="forgot-button" value="Request Password Reset" onClick={requestPass} />
            </div>
        </div>
    );
}

export default ForgotPassword;