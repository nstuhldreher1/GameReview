import GameCard from './GameCard.js';

import { useContext } from 'react';
import { SearchContext } from '../pages/Search';
import { Link } from 'react-router-dom';

import './GamesGrid.css';

// returns a JSX "box" that holds all of the games that were searched
// this returns to the search page (games tab)
function GamesGrid(){

    const { games } = useContext(SearchContext);
    return(
        <div id="grid">
            {games.map((game) => {
                return (
                    <Link to={`/game/${game.gameId}`} style={{ textDecoration: 'none' }}>
                        <GameCard name={game.name} gameCover={game.gameCover}/>
                    </Link>
                );
            })}
        </div>
    );
}

export default GamesGrid;