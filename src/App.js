import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';



const router = createBrowserRouter([
  {path: '/', element: <LandingPage/>},
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
