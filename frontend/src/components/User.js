import './User.css';

import placeHolder from '../images/placeHolderImage.png';

// A component for each user (rectangle with stuff in it)
// Gets sent to UsersList
function User(props){
    return(
        <div id = "userContainer">
            <img id="userProfilePicture" src={placeHolder} alt=" of user."></img>
            <p title="username" id="userName">{props.name}</p>
            <p title="email" id="userEmail">{props.username}</p>
        </div>
    );
}

export default User;