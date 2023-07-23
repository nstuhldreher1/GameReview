import './Search.css';

import NavBar from '../components/NavBar.js';
import GamesGrid from '../components/GamesGrid.js';
import UsersList from '../components/UsersList';

import searchIcon from '../images/search.png';

import { useEffect, useState } from 'react';

const app_name = "gamereview-debf57bc9a85";

function Search(){
    
    //Dynamically sets build path for fetch
    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com' + route;
        }
        else{
            return 'http://localhost:3001' + route;
        }
    }

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
    let input;

    // search function
    const search = async event =>
    {
        event.preventDefault();

        // depending on what tab is open, make API call for the tab
        if (toggleTab === 0) {
            console.log("searchUsers: " + input.value);
            // make API search call for users    
            const response = await fetch(buildPath('/api/searchUsers'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchUsers: input.value
                }),
            });

            // must parse response to become js object instead of json
            let res = JSON.parse(await response.text());
            console.log(res);
            // console.log(res.game_id);
            
        } else {

            console.log("searchGames: " + input.value);
            // make API search call for games
            const response = await fetch(buildPath('/api/searchGames'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchGames: input.value
                }),
            });

            // must parse response to become js object instead of json
            let res = JSON.parse(await response.text());
            console.log(res);
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