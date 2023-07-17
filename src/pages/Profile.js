import './Profile.css';
import NavBar from '../components/NavBar';
import Post from '../components/Post';

const input = [
    
    {
        "name" : "Nicholas Stuhldreher",
        "image" : "profileimage.jpg",
        "username": "nstuhldreher",
        "review": "This game is awesome!",
        "game": "Diablo 4",
    },

];

function Profile(){
    return(
        <div id="profilePage">
            <NavBar/>
        <div id="yourratings">Your Ratings</div>
            <div id="posts">
                {input.map(post =>{
                        return(
                            <Post image = {post.image} name={post.name} username={post.username} review= {post.review} game={post.game} ></Post>
                        );
                })}
            </div>
        </div>
    );
    
}

export default Profile;
