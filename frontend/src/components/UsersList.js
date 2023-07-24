import './UsersList.css';

import User from './User.js';
import { useContext } from 'react';
import { SearchContext } from '../pages/Search';

// returns to search page (users tab)
function UsersList(){
    const {users} = useContext(SearchContext);
    return(
        <div id="list">
            {users.map((user)=>{
                return(
                    <Link to = {'/profile/${user.userId}'} style = {{textDecoration: 'none'}}> 
                        <User username={user.username} name={user.name}/>
                    </Link> 
                );
            })}
        </div>
    )
}

export default UsersList;