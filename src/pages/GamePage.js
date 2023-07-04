import './GamePage.css';
import NavBar from '../components/NavBar.js';
import Game from '../components/Game.js';

function GamePage(){
    return(
        <div id="container">
            <NavBar/>
            <Game/>
        </div>
    );
}

export default GamePage;