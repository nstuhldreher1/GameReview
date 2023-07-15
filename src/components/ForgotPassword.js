import './ForgotPassword.css';

function ForgotPassword(){
    return (
        <div id="forgot">
            <div id="forgot-inside">
                <h1 id="forgot-title">Forgot Password</h1>
                <p id="forgot-description">To begin resetting your password, enter your email below.</p>
                <form id="form-forgot">
                    <p class="form-text">Email</p>
                    <input type="text" id="forgot-email" class="form-data"/>
                </form>
            </div>


            <div id="button-position">
                <input type="button" id="forgot-button" value="Request Password Reset"  />
            </div>
        </div>
    );
}

export default ForgotPassword;