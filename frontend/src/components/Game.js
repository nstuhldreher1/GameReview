import { useState, useContext } from 'react';
import { HasReviewedContext } from '../pages/GamePage';

import fullstar from '../images/fullstar.svg';
import emptystar from '../images/emptystar.svg';

import StarRating from './StarRating';

import './Game.css';

// this returns a div that "contains" all the info needed for the game
// this JSX is returned for the Game Page
const app_name = "gamereview-debf57bc9a85";

function Game(props) {
    //Dynamically sets build path for fetch
    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com' + route;
        }
        else{
            return 'http://localhost:3001' + route;
        }
    }

    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const { reviewed } = useContext(HasReviewedContext);

    // add review input
    const userId = parseInt(localStorage.getItem('userID'));
    const gameId = props.id;
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
    

    // functions for opening/closing the popup form
    function openReviewPopup(){
        setShowReviewPopup(true);
    }

    function closeReviewPopup(){
        setShowReviewPopup(false);
    }


    
    const GameStarRating = () => {
        const filledStars = Math.round(props.stars);
        const emptyStars = 5 - filledStars;

        const stars = [];

        for (let i = 0; i < filledStars; i++) {
            stars.push(<img className="gameStarFull" src={fullstar}></img>);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<img className="gameStarEmpty" src={emptystar}></img>);
        }

        return stars;
    }

    const checkInput = (event) => {

    }

    // CRUD operations
    const addReview = async (event) => {
        try {
            const addReviewResponse = await fetch(buildPath('/api/addReview'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userId,
                    gameID: gameId,
                    comment: comment,
                    rating: rating,
                    gameName: props.title,
                })
            });

            console.log(addReviewResponse);
            const data = await addReviewResponse.json();
            console.log(data);

            // if the user exists in the database, check if they're email verified
            if (addReviewResponse.status === 200) {
                console.log('Review added successfully');
            } else {
                console.log('Review add failure!');
            }
        } catch (error) {
            console.error('Error with add review fetch: ', error);
        }

        closeReviewPopup();
        window.location.reload(false);
    }

    const editReview = async (event) => {
        try {
            const editReviewResponse = await fetch(buildPath('/api/editReview'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: userId,
                    gameID: gameId,
                    comment: comment,
                    rating: rating,
                })
            });

            console.log(editReviewResponse);
            const data = await editReviewResponse.json();
            console.log(data);

            // if the user exists in the database, check if they're email verified
            if (editReviewResponse.status === 200) {
                console.log('Review edited successfully');
            } else {
                console.log('Review edit failure!');
            }
        } catch (error) {
            console.error('Error with edit review fetch: ', error);
        }

        closeReviewPopup();
        window.location.reload(false);
    }

    const deleteReview = async (event) => {
        let areYouSure = window.confirm('Are you sure you want to delete your review?');;

        if (areYouSure) {
            try {
                const deleteReviewResponse = await fetch(buildPath('/api/deleteReview'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userID: userId,
                        gameID: gameId,
                    })
                });
    
                console.log(deleteReviewResponse);
                const data = await deleteReviewResponse.json();
                console.log(data);
    
                // if the user exists in the database, check if they're email verified
                if (deleteReviewResponse.status === 200) {
                    console.log('Review deleted successfully');
                } else {
                    console.log('Review delete failure!');
                }
            } catch (error) {
                console.error('Error with delete review fetch: ', error);
            }
    
            closeReviewPopup();
            window.location.reload(false);
        }
    }




    return (
        <div>
            <div id="gameContainer">
                <div id="imageContainer">
                    <img src={props.image} alt="Video game cover art." id="gameImage"></img>
                </div>
                <p id="gameTitle">{props.title}</p>

                { !reviewed && <button id="reviewButton" onClick={openReviewPopup}>Review</button>}
                { reviewed && <button id="reviewButton" onClick={openReviewPopup}>Edit</button>}

                <p id="avgRating">Avg Rating</p>
                <p id="gameStars"><GameStarRating/></p>
                <p id="gameDescription">{props.description}</p>    
            </div>
            {/* below is an AND expression for the review popup form */}
            { showReviewPopup && <div id="reviewPopup">
                        <button id="reviewPopupCloseButton" onClick={closeReviewPopup}>X</button>
                        <p id="reviewPopupRateText">Rate</p>
                        <div id="reviewPopupStars">
                            <StarRating rating={rating} setRating={setRating}/>
                        </div>
                        
                        <form id="reviewPopupForm">
                            <textarea id="reviewPopupInput" onChange={(e) => setComment(e.target.value)}></textarea>
                        </form>
                        { !reviewed && <button id="reviewPopupPostButton" onClick={addReview}>Post</button>}
                        { reviewed && <button id="reviewPopupDeleteButton" onClick={deleteReview}>Delete Review</button>}
                        { reviewed && <button id="reviewPopupEditButton" onClick={editReview}>Edit Review</button>}
                               
                    </div>}  
        </div>
    );
}

export default Game;