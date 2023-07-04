import GameReview from './GameReview.js';
import './ReviewList.css';

function ReviewList(){
    /* list that contains Game Review components. This list will be returned to GamePage */
    /* need to add scroll bar later on */
    return (
        <div id="reviewContainer">
            <GameReview/>
            <GameReview/>
            <GameReview/>
            <GameReview/>
            <GameReview/>
            <GameReview/>
            <GameReview/>
            <GameReview/>
            <GameReview/>
        </div>
    );
}

export default ReviewList;