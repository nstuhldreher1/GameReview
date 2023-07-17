import './GameReview.css';

import placeHolder from '../images/placeHolderImage.png';
import emptyHeart from '../images/heartEmpty.png';
// import heart from '../images/heart.png';


// returns a "box" that contains the information related to a user's review
// this is returned to the Game Page
function GameReview(){
    return (
        <div>
            <div id="gamereviewContainer">
                <img id="reviewerProfilePicture" src={placeHolder} alt="Reviewer profile icon"></img>
                <p id="activity">Nicholas Stuhlreher @nstuhldreher reviewed Diablo 4</p>
                <p id="reviewDescription">I really have been enjoying this game a lot so far. Excited to see where it goes in the future!</p>
                {/*<button id="likeButton">
                    <img id="heart" src={emptyHeart} alt="Heart icon."></img>
                    <p id="likes">20 likes</p>
                </button> */}
            </div>
        </div>
    );
}

export default GameReview;