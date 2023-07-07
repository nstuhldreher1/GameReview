import './User.css';

import placeHolder from '../images/placeHolderImage.png';

// A component for each user (rectangle with stuff in it)
// Gets sent to UsersList
function User(){
    return(
        <div id = "userContainer">
            <img id="userProfilePicture" src={placeHolder} alt="user profile picture"></img>
            <p id="userName">Nicholas Stuhlreher</p>
            <p id="userEmail">@nstuhldreher</p>
        </div>
    )
}

export default User;