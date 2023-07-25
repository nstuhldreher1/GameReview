import './Feed.css';
import NavBar from '../components/NavBar.js';
import Post from '../components/Post.js';
import ReviewList from '../components/ReviewList';
import { useContext } from 'react';

const app_name = "gamereview-debf57bc9a85";
let review = [];

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

    //Dynamically sets build path for fetch
    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com' + route;
        }
        else{
            return 'http://localhost:3001' + route;
        }
    }
    async function fetchFeed(event) {
        event.preventDefault();

        console.log("response");
        let username = localStorage.getItem("username");
        let data;
        console.log(username);
        try {
            const response = await fetch(buildPath('/api/userfeed'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                })
            });
            if(response.status === 500) console.log("no reviews found");
            data = await response.json();
            console.log(data);

        }
        catch(error){
            console.error('Error fetching data: ', error);
        }
        review.push(data);
        console.log(review);
    }
    return(
        <div id="feed" onLoad={fetchFeed}>
            <NavBar/>
            <div id="reviews">
                <ReviewList reviews={review}></ReviewList>
            </div>
        </div>
    );
}

export default Feed;