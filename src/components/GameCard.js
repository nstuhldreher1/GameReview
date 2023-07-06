import placeHolder from '../images/placeHolderImage.png';
import './GameCard.css';

function GameCard(){
    return (
        <div className="card">
            <img id="cardImage" src={placeHolder} alt="Game cover art."></img>
            <p id="cardGameTitle">Game Title</p>
        </div>
    )
}

export default GameCard;