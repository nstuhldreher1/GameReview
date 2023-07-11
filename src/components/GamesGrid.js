import GameCard from './GameCard.js';

import './GamesGrid.css';

// returns a JSX "box" that holds all of the games that were searched
// this returns to the search page (games tab)
function GamesGrid(){
    return(
        <div id="grid">
            {/* placeholder cards */}
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
        </div>
    );
}

export default GamesGrid;