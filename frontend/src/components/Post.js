import './Post.css';
import placeHolder from '../images/placeHolderImage.png';
import StarRating from './StarRating';

function Post(props){

    return(
        <div id="post">
            <img id ="reviewerProfilePicture" src={placeHolder}></img>
            <p id= "post-text">{props.name} {"@" + props.username} {"Reviewed " + props.game}</p>
            <div id= "stars">
                <StarRating/>
            </div>
            <p id = "post-text-review">{props.review}</p>
        </div>
    );
}

export default Post;
