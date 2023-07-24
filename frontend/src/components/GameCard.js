import placeHolder from '../images/placeHolderImage.png';

import './GameCard.css';

// returns a JSX "box" that houses the information about a game
// this is returned to the search page (games tab)
function GameCard(props){
    return (
        <div className="card">
            <img id="cardImage" src={props.gameCover} alt="Game cover art."></img>
            <p id="cardGameTitle">{props.name}</p>
        </div>
    );
}

export default GameCard;