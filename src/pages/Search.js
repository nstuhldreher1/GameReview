import './Search.css';
import NavBar from '../components/NavBar.js';
import searchIcon from '../images/search.png';

function Search(){
    return (
        <div id="searchPage">
            <div id="navigation">
                <NavBar/>
            </div>
            <form id="searchBar">
                <button id="searchButton">
                    <img id="searchIcon" src={searchIcon}></img>
                </button>
                <input id="searchInput"></input>
            </form>
            <button id="users">Users</button>
            <button id="games">Games</button>
            <div id="gameTab">

            </div>
            <div id="userTab">
                
            </div>
        </div>
    );
}

export default Search;