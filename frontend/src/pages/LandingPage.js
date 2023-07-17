import './LandingPage.css';
import {Link} from 'react-router-dom';
import logo from '../images/logo.svg';

function LandingPage(){
    
    return (
        <div id="landing-page">
            <div id="landingPageHeader">
                <h1 id="title">Welcome to Game Review</h1>
                <Link to="/login" id="link">
                    <button id="linkButton">Get Started</button>
                </Link>
            </div>
            <img src={logo} id="landingPageLogo" alt="Website logo"></img>
        </div>
    );
}

export default LandingPage;