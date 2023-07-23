import './RecoveredPassword.css';

import { useContext } from 'react';
import { RecoveryContext } from '../pages/LoginPage';

function RecoveredPassword(){

    const { setPage } = useContext(RecoveryContext);

    function backToLogin() {
        setPage('login');
    }

    return (
        <div>
            <div className="form">
                <div className="form-inside">
                    <h1 className="form-title">Password Successfully Reset</h1>
                    
                    <button id="recovered-button" onClick={backToLogin}>Back to Login</button>
                </div>
            </div>
        </div>
    );
}

export default RecoveredPassword;