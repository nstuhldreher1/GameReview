import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Feed from './pages/Feed.js';
import Search from './pages/Search.js';
import Review from './pages/Review.js';
import Profile from './pages/Profile.js';



const router = createBrowserRouter([
  {path: '/', element: <LandingPage/>},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <Signup/>},
  {path: '/feed', element: <Feed/>},
  {path: '/profile', element: <Profile/>},
  {path: '/search', element: <Search/>},
  {path: '/review', element: <Review/>}
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
