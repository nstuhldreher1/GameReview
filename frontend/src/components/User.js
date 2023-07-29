import './User.css';

// A component for each user (rectangle with stuff in it)
// Gets sent to UsersList
function User(props){
    return(
        <div id = "userContainer">
            <img id="userProfilePicture" src={props.profilePicture} alt=" of user."></img>
            <p title="username" id="userName">{props.name}</p>
            <p title="email" id="userEmail">@{props.username}</p>
        </div>
    );
}

export default User;