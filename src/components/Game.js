import placeHolder from '../images/placeHolderImage.png';
import './Game.css';

/* when looking at figma, imagine a box containing the img, title, stars, etc. of the game */
function Game(){
    return (
        <div id="gameContainer">
            <img src={placeHolder} alt="Picture of game." id="gameImage"></img>
            <p id="gameTitle">Game Title</p>
            <button id="reviewButton">Review</button>
            <p id="avgRating">Avg Rating</p>"
            <p id="gameDescription">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
        </div>
    );
}

export default Game;