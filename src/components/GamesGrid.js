import GameCard from './GameCard.js';
import './GamesGrid.css';

function GamesGrid(){
    return(
        <div id="grid">
            <div id="cards">
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
            </div> 
        </div>
    )
}

export default GamesGrid;