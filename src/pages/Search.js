import './Search.css';
import NavBar from '../components/NavBar.js';
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
                    <img id="searchIcon" src={searchIcon}></img>
                </button>
                <input id="searchInput"></input>
            </form>
            <button id="users" onClick={() => toggleTab(0)} style={{ textDecoration: toggleState ? 'none' : 'underline' }}>Users</button>
            <button id="games" onClick={() => toggleTab(1)} style={{ textDecoration: toggleState ? 'underline' : 'none' }}>Games</button>
            {toggleState === 1 ? <div id="userTab"></div> : <div id="gameTab"></div>}

        </div>
    );
}

export default Search;