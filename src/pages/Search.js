import './Search.css';
import NavBar from '../components/NavBar.js';

function Search(){
    return (
        <div id="searchPage">
            <div id="navigation">
                <NavBar/>
            </div>
            <div id="search">
                <form id="searchBar">
                    <button id="searchButton">
                        <img id="searchIcon"></img>
                    </button>
                    <input id="searchInput"></input>
                </form>
            </div>
        </div>
    );
}

export default Search;