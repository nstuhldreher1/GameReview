import './Search.css';

import NavBar from '../components/NavBar.js';
import GamesGrid from '../components/GamesGrid.js';
import UsersList from '../components/UsersList';

import searchIcon from '../images/search.png';

import { useState } from 'react';

function Search(){

    // 0 for users tab, 1 for games tab
    const [toggleState, setToggleState] = useState(0);

    // change 0 or 1 depending on what tab was clicked
    const toggleTab = (tabType) => {
        setToggleState(tabType);
    };

    return (
        <div id="searchPage">
            <div id="navigation">
                <NavBar/>
            </div>

            <form id="searchBar">
                <button id="searchButton">
                    <img id="searchIcon" src={searchIcon} alt="Search icon."></img>
                </button>
                <input id="searchInput"></input>
            </form>

            <button id="usersButton" onClick={() => toggleTab(0)} style={{ textDecoration: toggleState ? 'none' : 'underline' }}>Users</button>
            <button id="gamesButton" onClick={() => toggleTab(1)} style={{ textDecoration: toggleState ? 'underline' : 'none' }}>Games</button>
            
            {/* depending on toggleState, show the tab */}
            {toggleState === 0 ? 
                <div id="userTab">
                    <UsersList/>
                </div> : 
                <div id="gameTab">
                    <GamesGrid/>
                </div>
            }
        </div>
    );
}

export default Search;