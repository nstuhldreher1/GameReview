import './NavBar.css';
import logo from '../images/logo.svg';
import {Link} from 'react-router-dom';

function NavBar(){
    return(
        <div id="navbar">
            <img src={logo} alt="" id="icon-navbar"></img>
            <Link to="/feed" class="nav-text"><h1 id="home" >Home</h1></Link>
            <Link to="/profile"  class="nav-text"><h1 id="profile">My Profile</h1></Link>
            <Link to="/search" class="nav-text"><h1 id="search" >Search</h1></Link>
            <Link to="/login" class="nav-text"><h1 id="logout" >Logout</h1></Link>
        </div>
    );
}

export default NavBar;