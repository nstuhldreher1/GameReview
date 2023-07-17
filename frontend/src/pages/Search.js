import './Search.css';

import NavBar from '../components/NavBar.js';
import GamesGrid from '../components/GamesGrid.js';
import UsersList from '../components/UsersList';

import searchIcon from '../images/search.png';

import { useEffect, useState } from 'react';

function Search(){

    // 0 for users tab, 1 for games tab
    const [toggleTab, setToggleTab] = useState(0);

    // change 0 or 1 depending on what tab was clicked
    const switchTab = (tabType) => {
        setToggleTab(tabType);
    };


    // shows currently displayed games/users
    const [games, setGames] = useState({});
    const [users, setUsers] = useState({});

    // user input
    var input;

    // search function
    const search = async event =>
    {
        event.preventDefault();

        // depending on what tab is open, make API call for the tab
        if (toggleTab === 0) {
            // make API search call for users
            var object = {searchUsers: input.value};
            var js = JSON.stringify(object);
    
            const response = await fetch('https://jsonplaceholder.typicode.com/posts',
                {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});
            var txt = await response.text();
            var res = JSON.parse(txt);
            console.log(res);
        } else {
            // make API search call for games
            var object = {searchGames: input.value};
    
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', 
                {method: 'POST', body: JSON.stringify(object), headers:{'Content-Type': 'application/json'}});
            var result = JSON.parse(await response.text());
            console.log(result);
        }


    };

    return (
        <div id="searchPage">
            <div id="searchNavigation">
                <NavBar/>
            </div>
            <div id="searchContent">
                <div id="searchHeader">
                    <form id="searchBar">
                        <button id="searchButton" onClick={search}>
                            <img id="searchIcon" src={searchIcon} alt="Search icon."></img>
                        </button>
                        <input id="searchInput" ref={(c) => input = c}></input>
                    </form>
                    <div id="searchTabs">
                        <button id="usersButton" onClick={() => switchTab(0)} style={{ textDecoration: toggleTab ? 'none' : 'underline' }}>Users</button>
                        <button id="gamesButton" onClick={() => switchTab(1)} style={{ textDecoration: toggleTab ? 'underline' : 'none' }}>Games</button>
                    </div>
                </div>
                <div id="searchedItems">
                    {/* depending on toggleState, show the tab */}
                    {toggleTab === 0 ? <UsersList /> : <GamesGrid />}
                </div>
            </div>
        </div>
    );
}

export default Search;