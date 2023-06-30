import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import Login from './pages/Login.js';



const router = createBrowserRouter([
  {path: '/', element: <LandingPage/>},
  {path: '/login', element: <Login/>}
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
