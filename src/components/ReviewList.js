import GameReview from './GameReview.js';
import './ReviewList.css';

// returns a JSX "box" that houses all of the review components
// this is returned to the game Page
function ReviewList(){
    return (
        <div id="reviewContainer">
            {/* place holder review components below */}
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