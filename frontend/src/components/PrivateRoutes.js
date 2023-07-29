import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children}) => {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt);
    console.log(children);
    return jwt ? children : <Navigate to="/login"/>;
}

export default PrivateRoutes