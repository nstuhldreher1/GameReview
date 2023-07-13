import './Search.css';

import NavBar from '../components/NavBar.js';
import GamesGrid from '../components/GamesGrid.js';
import UsersList from '../components/UsersList';
import SearchBar from '../components/SearchBar';

import { useState } from 'react';

function Search(){

    // 0 for users tab, 1 for games tab
    const [toggleState, setToggleState] = useState(0);

    // change 0 or 1 depending on what tab was clicked
    const toggleTab = (tabType) => {
        setToggleState(tabType);
    };

    // function that either searches for users or games 
    // depending on what tab is open



    return (
        <div id="searchPage">
            <div id="searchNavigation">
                <NavBar/>
            </div>
            <div id="searchContent">
                <div id="searchHeader">
                    <SearchBar/>
                    <div id="searchTabs">
                        <button id="usersButton" onClick={() => toggleTab(0)} style={{ textDecoration: toggleState ? 'none' : 'underline' }}>Users</button>
                        <button id="gamesButton" onClick={() => toggleTab(1)} style={{ textDecoration: toggleState ? 'underline' : 'none' }}>Games</button>
                    </div>
                </div>
                <div id="searchedItems">
                    {/* depending on toggleState, show the tab */}
                    {toggleState === 0 ? <UsersList /> : <GamesGrid />}
                </div>
            </div>
        </div>
    );
}

export default Search;