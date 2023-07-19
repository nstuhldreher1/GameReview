// import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import LoginPage from './pages/LoginPage.js';
import Signup from './pages/Signup.js';
//import Feed from './pages/Feed.js';
import Search from './pages/Search.js';
import Profile from './pages/Profile.js';
import GamePage from './pages/GamePage.js';



function App() {
  return (
    <Router>
      <Switch>
        <Route path= "/" exact>
          <LandingPage/>
        </Route>
        <Route path ="/login" exact>
          <LoginPage/>
        </Route>
        <Route path="/signup" exact>
          <Signup/>
        </Route>
        <Route path = "/profile" exact>
          <Profile/>
        </Route>
        <Route path="/search" exact>
          <Search/>
        </Route>
        <Route path="/game" exact>
          <GamePage/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
