import './UsersList.css';

import User from './User.js';

// returns to search page (users tab)
function UsersList(){
    return(
        <div id="list">
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
        </div>
    )
}

export default UsersList;