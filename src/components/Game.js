import placeHolder from '../images/placeHolderImage.png';
import './Game.css';

// this returns a div that "contains" all the info needed for the game
// this JSX is returned for the Game Page
function Game(){
    return (
        <div>
            <div id="gameContainer">
                <img src={placeHolder} alt="Video game cover art." id="gameImage"></img>
                <p id="gameTitle">Game Title</p>
                <button id="reviewButton">Review</button>
                <p id="avgRating">Avg Rating</p>
                <p id="gameDescription">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.</p>
            </div>
        </div>
    );
}

export default Game;