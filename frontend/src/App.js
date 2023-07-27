// import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import LoginPage from './pages/LoginPage.js';
import Signup from './pages/Signup.js';
import Feed from './pages/Feed.js';

import Search from './pages/Search.js';
import Profile from './pages/Profile.js';
import GamePage from './pages/GamePage.js';

const router = createBrowserRouter([
  {path: '/', element: <LandingPage/>},
  {path: '/login', element: <LoginPage/>},
  {path: '/signup', element: <Signup/>},
  //{path: '/feed', element: <Feed/>},
  {path: '/search', element: <Search/>},
  {path: '/game/:gameId', element: <GamePage/>},
  {path: '/user/:UserID', element: <Profile/>}
]);

function App() {
    return <RouterProvider router={router}/>;
  
}

export default App;
