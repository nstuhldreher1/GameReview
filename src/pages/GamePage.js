import './GamePage.css';
import NavBar from '../components/NavBar.js';
import Game from '../components/Game.js';
import ReviewList from '../components/ReviewList';

function GamePage(){
    return(
        <div id="gamePage">
            <div id="navigation">
                <NavBar/>
            </div>
            <div id="game">
                <Game/>
            </div>
            <div id="review">
                <ReviewList/>
            </div>
        </div>
    );
}

export default GamePage;