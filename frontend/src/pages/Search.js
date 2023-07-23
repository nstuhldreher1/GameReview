import './Search.css';

import NavBar from '../components/NavBar.js';
import GamesGrid from '../components/GamesGrid.js';
import UsersList from '../components/UsersList';

import searchIcon from '../images/search.png';

import { useEffect, useState, createContext } from 'react';

export const SearchContext = createContext();

const app_name = "gamereview-debf57bc9a85";

function Search() {
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
    const [input, setInput] = useState('');

    // search function
    const search = async event =>
    {
        event.preventDefault();

        // depending on what tab is open, make API call for the tab
        if (toggleTab === 0) {
            console.log("searchUsers: " + input);

            // make API search call for users    
            const usersResponse = await fetch(buildPath('/api/searchUsers'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchUsers: input
                }),
            });

            console.log(usersResponse);
            const usersData = await usersResponse.json();
            console.log(usersData);
            
        } else {
            console.log("searchGames: " + input);

            // make API search call for games
            const gamesResponse = await fetch(buildPath('/api/searchGames'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchGames: input
                }),
            });

            console.log(gamesResponse);
            const gamesData = await gamesResponse.json();
            console.log(gamesData);
        }
    };

    return (
        <SearchContext.Provider value={{games, users}}>
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
                            <input id="searchInput" onChange={(e) => setInput(e.target.value)}/>
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
        </SearchContext.Provider>
    );
}

export default Search;