import './Post.css';
import fullstar from '../images/fullstar.svg';
import emptystar from '../images/emptystar.svg';

function Post(props){
    /*insert stars function
    let count = 0;
    let full = document.createElement("img");
    let empty = document.createElement("img");

    full.src = fullstar;
    full.alt = "fullstar";
    full.className = "star";

    empty.src = emptystar;
    empty.alt = "emptystar";
    empty.className = "star";

    for(let i = 0; i < 5; i++){
        
        if(count < props.stars){
            document.getElementById("stars").appendChild(full);
        }
        else{
            document.getElementById("stars").appendChild(empty);
        }

        count++;
    }
    */

    return(
        <div id="post">
            <p class= "post-text">{props.name} {"@" + props.username}</p>
            <div id= "stars">
                
            </div>
            <p class = "post-text">{props.review}</p>

        </div>
    );
}

export default Post;