import './SearchBar.css';
import searchIcon from '../images/search.png';

function SearchBar(){
    return(
        <div>
            <form id="searchBar">
                <button id="searchButton">
                    <img id="searchIcon" src={searchIcon} alt="Search icon."></img>
                </button>
                <input id="searchInput"></input>
            </form>
        </div>
    );
}

export default SearchBar;