import './UsersList.css';

import User from './User.js';
import { useContext } from 'react';
import { SearchContext } from '../pages/Search';
import { Link } from 'react-router-dom';

// returns to search page (users tab)
function UsersList(){
    const {users} = useContext(SearchContext);
    return(
        <div id="list">
            {users.map((user)=>{
                return(
                    <Link to={`/user/${user.UserID}`} style = {{textDecoration: 'none'}}> 
                        <User username={user.username} name={user.name} profilePicture={user.profilePicture}/>
                    </Link> 
                );
            })}
        </div>
    )
}

export default UsersList;