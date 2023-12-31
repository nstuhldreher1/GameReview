import './NavBar.css';
import logo from '../images/logo.svg';
import {Link} from 'react-router-dom';

function NavBar(){

    function refresh() {
        window.location.reload();
    }

    return(
        <div id="navbar">
            <img src={logo} alt="" id="icon-navbar"></img>
            <Link to={`/user/${localStorage.getItem('userID')}`} className="nav-text" ><h1 id="home" >Home</h1></Link>
            <Link to="/search" className="nav-text"><h1 id="search" >Search</h1></Link>
            <Link to="/login" className="nav-text"><h1 id="logout" >Logout</h1></Link>
        </div>
    );
}

export default NavBar;