import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';



const router = createBrowserRouter([
  {path: '/', element: <LandingPage/>},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <Signup/>}
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
