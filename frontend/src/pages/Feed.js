import './Feed.css';
import NavBar from '../components/NavBar.js';
import Post from '../components/Post.js';
import Login from '../components/Login';
import reviewschema from '../../../reviewschema';
const app_name = "gamereview-debf57bc9a85";
import ReviewList from '../components/ReviewList';

const input = [
    
    {
        "name" : "Nicholas Stuhldreher",
        "image" : "profileimage.jpg",
        "username": "nstuhldreher",
        "review": "This game is awesome!",
        "likes" : 100
    },

];
const review = [];

function Feed(){

    //Dynamically sets build path for fetch
    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com' + route;
        }
        else{
            return 'http://localhost:3001' + route;
        }
    }
    // fetch cards
    const feed = async event => {
        event.preventDefault();

        try {
            const response = await fetch(buildPath('/api/userfeed'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: Login.username,
                })
            });
            review.add(response.json);

        }
        catch(error){
            console.error('Error fetching data: ', error);
        }
    }
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