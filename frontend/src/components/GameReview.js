import './GameReview.css';

import fullstar from '../images/fullstar.svg';
import emptystar from '../images/emptystar.svg';

// returns a "box" that contains the information related to a user's review
// this is returned to the Game Page
function GameReview(props){

    const StarRating = () => {
        const filledStars = Math.round(props.stars);
        const emptyStars = 5 - filledStars;

        const stars = [];

        for (let i = 0; i < filledStars; i++) {
            stars.push(<img className="reviewStarFull" src={fullstar} alt="full star"></img>);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<img className="reviewStarEmpty" src={emptystar} alt="empty star"></img>);
        }

        return stars;
    }

    return (
        <div>
            <div id="gamereviewContainer">
                <img title="reviewerProfilePicture" id="reviewerProfilePicture" src={'/images/profilePicturePlaceHolder.png'} alt="Reviewer profile icon"></img>
                <p title="activity" id="activity">{props.activity}</p>
                <p title="reviewStars" id="reviewStars"><StarRating/></p>
                <p title="reviewDescription" id="reviewDescription">{props.comment}</p>
            </div>
        </div>
    );
}

export default GameReview;