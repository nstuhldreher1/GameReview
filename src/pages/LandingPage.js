import './LandingPage.css';
import {Link} from 'react-router-dom';

function LandingPage(){
    
    return (
        <div id="landing-page">
            
            
            <Link to="/login&signup" id="link">
                <button id="linkButton">Get Started</button>
            </Link>
            <h1 id="title">Welcome to GameReview</h1>
           
        </div>
    );
}

export default LandingPage;