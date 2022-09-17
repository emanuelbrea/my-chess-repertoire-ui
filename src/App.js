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
import ContactForm from './components/public/ContactForm';
import About from './components/public/About';
import Faq from './components/public/Faq';

export default function App() {
  Amplify.configure(awsconfig);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/recover" element={<Recover/>}/>
        <Route exact path="/verify" element={<Verify/>}/>
        <Route exact path='/' element={<NavBar/>}>
          <Route index element={<LandingPage/>}/>
          <Route exact path="/contact" element={<ContactForm/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/faq" element={<Faq/>}/>
          <Route path='/repertoires' element={
            <PrivateRoute>
              <>
                <Repertoires/>
              </>
            </PrivateRoute>
          }/>
          <Route path='/repertoire/:color' element={
            <PrivateRoute>
              <Repertoire/>
            </PrivateRoute>
          }/>
          <Route path='/profile' element={
            <PrivateRoute>
              <>
                <Profile/>
              </>
            </PrivateRoute>
          }/>
          <Route
            path="*"
            element={<Navigate to="/" replace/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
