import { useState, createContext } from 'react';

import Login from '../components/Login.js';
import EmailVerifyForm from '../components/EmailVerifyForm.js';
import ForgotPassword from '../components/ForgotPassword.js';
import Otp from '../components/Otp.js';
import ResetPassword from '../components/ResetPassword.js';
import RecoveredPassword from '../components/RecoveredPassword.js';


export const RecoveryContext = createContext();

function LoginPage(){
    const [page, setPage] = useState("login");

    function Navigate() {
        if (page === "login") return <Login/>;
        if (page === "forgot") return <ForgotPassword/>;
        if (page === "otp") return <Otp/>;
        if (page === "reset") return <ResetPassword/>;
        return <RecoveredPassword/>;
    }

    return(
        <RecoveryContext.Provider value={{ page, setPage }}>
            <div className="flex justify-center items-center">
                <Navigate/>
            </div>
        </RecoveryContext.Provider>
    );
}

export default LoginPage;