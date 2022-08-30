import { Navigate } from 'react-router-dom';


export default function PrivateRoute({ children }) {

    if (!true) {
        return <Navigate to="/login" />
    }

    return children;
}