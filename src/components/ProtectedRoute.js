import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isSignedIn }) {
    if (isSignedIn === false) return <Navigate to="/" />;

    return children;
}

export default ProtectedRoute;
