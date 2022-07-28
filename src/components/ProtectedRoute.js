import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {

    if (!loggedIn) return <Navigate to="/login" />;

    return children;
}

export default ProtectedRoute;
