import './Profile.css';
import NavBar from '../components/NavBar';
import Post from '../components/Post';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
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

    // determines if the profile picture can be edited
    // const [profilePictureEditable, setProfilePictureEditable] = useState(false);

    const { UserID } = useParams();
    console.log(UserID);

    // terrible amalgamation of forcing a react component to update
    // const [count, setCount] = useState(0);

    useEffect(()=>{
        loadUserInfo();
    }, [UserID/*, count*/]);

    // useEffect(()=> {
    //     canEditProfilePicture();
    // }, [UserID]);

    // function canEditProfilePicture() {
    //     // get user id from logged user and id from selected user
    //     // selected user can be from search page, home page
    //     const id1 = parseInt(localStorage.getItem('userID'));
    //     const id2 = parseInt(UserID);

    //     if (id1 === id2) {
    //         setProfilePictureEditable(true);
    //     } else {
    //         setProfilePictureEditable(false);
    //     }

    //     console.log(profilePictureEditable);
    // };

    // const handleFileChange = async (e) => {
    //     console.log("began handlefilechange");
    //     const file = e.target.files[0];

    //     if (!file) {
    //         console.log("error with file");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('profilePicture', file);        
        
    //     const userId = localStorage.getItem('userID'); // Retrieve user ID from local storage
    //     formData.append('userID', userId); 

    //     try {
    //         const response = await fetch(buildPath('/api/changeProfilePicture'), {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         if (response.status === 200) {
    //             console.log('image uploaded successfully');
    //             setCount(count + 1);
    //         } else {
    //             console.log('An internal server error occurred');
    //         }
    //     } catch (error) {
    //         console.error('Error uploading iamge: ' + error);
    //     }
    // };

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
            <NavBar title="navbar" />
            <div title="posts" id="posts">
            <img className = "UserHeader" id="userPicture" src={userInfo.profilePicture} alt="Reviewer profile icon"></img>
                {/* {profilePictureEditable && 
                <div className="image-upload">
                    <label id="picture" htmlFor="file-input">
                        <img className="UserHeader" id="userPictureEditable" src={userInfo.profilePicture} alt="Reviewer profile icon"/>  </label>

                    <input id="file-input" type="file" onChange={handleFileChange}/>
                </div>}
                {!profilePictureEditable && <img className = "UserHeader" id="userPicture" src={userInfo.profilePicture} alt="Reviewer profile icon"></img>} */}

                    <div className = "UserHeader" id="UserTitle">
                        <p  id="nameOfUser">{userInfo.name}</p>
                        <p  id= "usernameOfUser">@{userInfo.username}</p>
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
