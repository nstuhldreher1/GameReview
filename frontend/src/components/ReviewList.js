import './ReviewList.css';

import { useContext } from 'react';
import { ReviewsContext } from '../pages/GamePage.js';


import GameReview from './GameReview.js';

// returns a JSX "box" that houses all of the review components
// this is returned to the game Page
function ReviewList(){

    const { gameReviews, setGameReviews } = useContext(ReviewsContext);

    return (
        <div id="reviewContainer">
            {gameReviews.map((review) => {
                return (
                    <GameReview activity={review.activity} profilePicture={review.profilePicture} stars={review.rating} comment={review.comment}/>
                );
            })}
        </div>
    );
}

export default ReviewList;
