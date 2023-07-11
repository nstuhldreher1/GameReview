import placeHolder from '../images/placeHolderImage.png';

import './GameCard.css';

// returns a JSX "box" that houses the information about a game
// this is returned to the search page (games tab)
function GameCard(){
    return (
        <div className="card">
            <img id="cardImage" src={placeHolder} alt="Game cover art."></img>
            <p id="cardGameTitle">The Legend of Zelda: Tears of the Kingdom</p>
        </div>
    );
}

export default GameCard;