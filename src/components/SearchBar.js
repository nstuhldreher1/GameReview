import './SearchBar.css';
import searchIcon from '../images/search.png';

function SearchBar(){

    // user input
    var input;

    // search function
    const search = async event =>
    {
        event.preventDefault();
        alert("input: " + input.value);
    };

    return(
        <div>
            <form id="searchBar">
                <button id="searchButton" onClick={search}>
                    <img id="searchIcon" src={searchIcon} alt="Search icon."></img>
                </button>
                <input id="searchInput" ref={(c) => input = c}></input>
            </form>
        </div>
    );
}

export default SearchBar;