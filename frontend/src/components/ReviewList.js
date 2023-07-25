import GameReview from './GameReview.js';
import './ReviewList.css';

// returns a JSX "box" that houses all of the review components
// this is returned to the game Page
function ReviewList(props){
    function showUsers({ users }) {
        
    }

    return (
        <div id="reviewContainer">
             
            <p id = "post-text-review">{props.review}</p>
            {/* place holder review components below */}
        </div>
    );
}

export default ReviewList;