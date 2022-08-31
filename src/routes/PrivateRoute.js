import {Navigate} from 'react-router-dom';
import {Auth} from 'aws-amplify'
import {useEffect, useState} from "react";
import Loading from "../components/public/Loading";

export default function PrivateRoute({children}) {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    async function checkAuthState() {
        try {
            setLoading(true);
            const user = await Auth.currentAuthenticatedUser();
            setLoggedIn(!!user);
        } catch (err) {
            setLoggedIn(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuthState()
    })

    if (loading) {
        return (<Loading/>)
    }

    if (loggedIn) return children

    return <Navigate replace to="/login"/>

}