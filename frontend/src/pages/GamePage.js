import './GamePage.css';

import NavBar from '../components/NavBar.js';
import Game from '../components/Game.js';
import ReviewList from '../components/ReviewList.js';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

// gamepage split into navigation and content sections
// content section split into game and review sections
const app_name = "gamereview-debf57bc9a85";

export const ReviewsContext = createContext();
export const HasReviewedContext = createContext();

function GamePage() {

    const [gameInfo, setGameInfo] = useState({});
    const [gameReviews, setGameReviews] = useState([]);
    const [reviewed, setReviewed] = useState(false);

    //Dynamically sets build path for fetch
    function buildPath(route){
        if(process.env.NODE_ENV === 'production'){
            return 'https://' + app_name +'.herokuapp.com' + route;
        }
        else{
            return 'http://localhost:3001' + route;
        }
    }

    const { gameId } = useParams();

    useEffect(() => {
        loadGameInfo();
    }, []);

    useEffect(() => {
        loadGameReviews();
    }, []);

    
    const loadGameInfo = async () => {
        try {
            const response = await fetch(buildPath('/api/loadGameInfo'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameId: gameId
                })
            });

            console.log(response);
            const data = await response.json();
            console.log('data.gameInfo' + data.gameInfo);
            setGameInfo(data.gameInfo);

            // if the user exists in the database, check if they're email verified
            if (response.status === 200) {
                console.log('Game info recieved');
            } else {
                console.log('Error fetching data');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    const loadGameReviews = async () => {
        try {
            const response = await fetch(buildPath('/api/loadGameReviews'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameId: gameId,
                    userID: localStorage.getItem('userID'),
                })
            });

            console.log(response);
            const data = await response.json();
            console.log(data);
            setGameReviews(data.foundReviews);
            console.log(data.userReviewedGame);
            setReviewed(data.userReviewedGame);
            console.log('reviewed: ' + reviewed);

            // if the user exists in the database, check if they're email verified
            if (response.status === 200) {
                console.log('Reviews recieved');
            } else {
                console.log('Error fetching data');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    return(
        <div id="gamePage">
            <div id="navigation">
                <NavBar/>    
            </div>
            <div id="content">
                <div id="review">
                    <ReviewsContext.Provider value={{ gameReviews, setGameReviews }}>
                        <ReviewList/>
                    </ReviewsContext.Provider>
                </div>
                <div id="game">
                    <HasReviewedContext.Provider value={{ reviewed, setReviewed}}>
                        <Game id={gameInfo.gameId} title={gameInfo.name} image={gameInfo.gameCover} description={gameInfo.gameDescription} stars={gameInfo.reviewStars}/>
                    </HasReviewedContext.Provider>
                </div>
            </div>
        </div>
    );
}

export default GamePage;