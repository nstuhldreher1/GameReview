import './Profile.css';
import NavBar from '../components/NavBar';
import Post from '../components/Post';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import placeHolder from '../images/placeHolderImage.png';
import GameReview from '../components/GameReview';



export const ReviewsContext = createContext();

const app_name = "gamereview-debf57bc9a85";

function Profile(){

    //Dynamically sets build path for fetch
    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com' + route;
        }
        else{
            return 'http://localhost:3001' + route;
        }
    }

    const [userInfo, setUserInfo] = useState({});
    const [userReviews, setUserReviews] = useState([]);

    useEffect(()=>{
        loadUserInfo();
    }, []);

    const { UserID } = useParams();
    console.log(UserID);
    const loadUserInfo = async () => {
        try {
            const response = await fetch(buildPath('/api/loadUserInfo'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserID: UserID
                })
            });

            console.log(response);
            const data = await response.json();
            console.log(data);
            setUserInfo(data.userInfo);
            setUserReviews(data.userReviews);

            // if the user exists in the database, check if they're email verified
            if (response.status === 200) {
                console.log('Game info recieved');
            } else {
                console.log('Error fetching data');
            }
        } catch (error) {
            console.error('Error fetching data: ' + error);
        }
    }

    return(
        <div id="profilePage">
            <NavBar/>
            <div id="posts">
                <div id="UserHeader">
                <img id="userProfilePicture" src={'/images/profilePicturePlaceHolder.png'} alt="Reviewer profile icon"></img>

                    <div id="UserTitle">
                        <p id="nameOfUser">{userInfo.name}</p>
                        <p id= "usernameOfUser">@{userInfo.username}</p>
                    </div>
                </div>
                {userReviews.map(review =>{
                        return(
                            <GameReview activity={review.activity} profilePicture={review.profilePicture} stars={review.rating} comment={review.comment}/>
                        );
                })}
            </div>
        </div>
    );
    
}

export default Profile;
