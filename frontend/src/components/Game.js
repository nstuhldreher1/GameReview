import { useState } from 'react';

import fullstar from '../images/fullstar.svg';
import emptystar from '../images/emptystar.svg';

import './Game.css';

// this returns a div that "contains" all the info needed for the game
// this JSX is returned for the Game Page
function Game(props){

    const [showReviewPopup, setShowReviewPopup] = useState(false);

    // functions for opening/closing the popup form
    function openReviewPopup(){
        setShowReviewPopup(true);
    }

    function closeReviewPopup(){
        setShowReviewPopup(false);
    }

    const StarRating = () => {
        const filledStars = Math.round(props.stars);
        const emptyStars = 5 - filledStars;

        const stars = [];

        for (let i = 0; i < filledStars; i++) {
            stars.push(<img className="gameStarFull" src={fullstar}></img>);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<img className="gameStarEmpty" src={emptystar}></img>);
        }

        return stars;
    }

    return (
        <div>
            <div id="gameContainer">
                <div id="imageContainer">
                    <img src={props.image} alt="Video game cover art." id="gameImage"></img>
                </div>
                <p id="gameTitle">{props.title}</p>
                <button id="reviewButton" onClick={openReviewPopup}>Review</button>
                <p id="avgRating">Avg Rating</p>
                <p id="gameStars"><StarRating/></p>
                <p id="gameDescription">{props.description}</p>    
            </div>
            {/* below is an AND expression for the review popup form */}
            { showReviewPopup && <div id="reviewPopup">
                        <button id="reviewPopupCloseButton" onClick={closeReviewPopup}>X</button>
                        <p id="reviewPopupRateText">Rate </p>
                        <form id="reviewPopupForm">
                            <textarea id="reviewPopupInput"></textarea>
                        </form>
                        <button id="reviewPopupPostButton" onClick={closeReviewPopup}>Post</button>
                    </div>}  
        </div>
    );
}

export default Game;