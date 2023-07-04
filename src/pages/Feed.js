import './Feed.css';
import NavBar from '../components/NavBar.js';
import Post from '../components/Post.js';

const input = [
    
    {
        "name" : "Nicholas Stuhldreher",
        "image" : "profileimage.jpg",
        "username": "nstuhldreher",
        "review": "This game is awesome!",
        "likes" : 100
    },

];

function Feed(){
    return(
        <div id="feed">
            <NavBar/>
            <div id="posts">
                    {input.map(post =>{
                        return(
                            <Post image = {post.image} name={post.name} username={post.username} review= {post.review} likes={post.likes}></Post>
                        );
                    })}
            </div>
        </div>
    );
}

export default Feed;