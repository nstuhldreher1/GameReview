import './GamePage.css';

import NavBar from '../components/NavBar.js';
import Game from '../components/Game.js';
import ReviewList from '../components/ReviewList.js';

// gamepage split into navigation and content sections
// content section split into game and review sections
function GamePage(){


    return(
        <div id="gamePage">
            <div id="navigation">
                <NavBar/>    
            </div>
            <div id="content">
                <div id="review">
                    <ReviewList/>
                </div>
                <div id="game">
                    <Game/>
                </div>
            </div>
        </div>
    );
}

export default GamePage;