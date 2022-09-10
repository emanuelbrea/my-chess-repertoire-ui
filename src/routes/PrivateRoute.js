import {Navigate} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import React, {useEffect, useState, createContext} from 'react';
import Loading from '../components/public/Loading';
import PropTypes from 'prop-types';

const UserContext = createContext(undefined);

export default function PrivateRoute({children}) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuthState() {
      try {
        setLoading(true);
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
        setLoggedIn(!!user);
      } catch (err) {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuthState().catch(console.error);
  }, []);

  if (loading) {
    return (<Loading/>);
  }

  if (loggedIn) {
    return (
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    );
  } ;

  return <Navigate replace to="/login"/>;
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export {UserContext};
