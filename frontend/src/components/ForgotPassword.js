import './ForgotPassword.css';

function ForgotPassword(props){

    async function requestPass(event) {
        event.preventDefault();

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
                <input type="button" id="forgot-button" value="Request Password Reset" onClick={requestPass} />
            </div>
        </div>
    );
}

export default ForgotPassword;