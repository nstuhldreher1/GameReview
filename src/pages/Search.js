import './Search.css';

import NavBar from '../components/NavBar.js';
import GamesGrid from '../components/GamesGrid.js';

import searchIcon from '../images/search.png';

import { useState } from 'react';

function Search(){

    const [toggleState, setToggleState] = useState(0);

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
            
            {toggleState === 0 ? 
                <div id="userTab">

                </div> : 
                <div id="gameTab">
                    <GamesGrid/>
                </div>
            }

        </div>
    );
}

export default Search;