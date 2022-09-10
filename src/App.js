import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Register from './components/public/Register';
import Login from './components/public/Login';
import LandingPage from './components/public/LandingPage';
import Repertoire from './components/private/Repertoire';
import PrivateRoute from './routes/PrivateRoute';
import Profile from './components/private/Profile';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import Recover from './components/public/Recover';
import Verify from './components/public/Verify';
import Repertoires from './components/private/Repertoires';
import NavBar from './components/public/NavBar';

export default function App() {
  Amplify.configure(awsconfig);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/recover" element={<Recover/>}/>
        <Route exact path="/verify" element={<Verify/>}/>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/repertoires' element={
          <PrivateRoute>
            <>
              <NavBar/>
              <Repertoires/>
            </>
          </PrivateRoute>
        }/>
        <Route path='/repertoire/:color' element={
          <PrivateRoute>
            <>
              <NavBar/>
              <Repertoire/>
            </>
          </PrivateRoute>
        }/>
        <Route path='/profile' element={
          <PrivateRoute>
            <>
              <NavBar/>
              <Profile/>
            </>
          </PrivateRoute>
        }/>
        <Route
          path="*"
          element={<Navigate to="/" replace/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
