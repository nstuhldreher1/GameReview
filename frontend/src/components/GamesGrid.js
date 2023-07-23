import GameCard from './GameCard.js';

import { useContext } from 'react';
import { SearchContext } from '../pages/Search';

import './GamesGrid.css';

// returns a JSX "box" that holds all of the games that were searched
// this returns to the search page (games tab)
function GamesGrid(){

    const { games } = useContext(SearchContext);

    return(
        <div id="grid">
            {/* placeholder cards */}

        </div>
    );
}

export default GamesGrid;