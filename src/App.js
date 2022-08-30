import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Register from "./components/public/Register";
import Login from "./components/public/Login";
import LandingPage from "./components/public/LandingPage";
import Repertoire from "./components/private/Repertoire";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./components/private/Profile";

export default function App() {

    return (
        <BrowserRouter>
            <React.Fragment>
                <Routes>
                    <Route exact path="/register" element={<Register/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path='/' element={<LandingPage/>}/>
                    <Route path='/repertoire/:color' element={
                        <PrivateRoute>
                            <Repertoire />
                        </PrivateRoute>
                    }/>
                    <Route path='/profile' element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }/>
                    <Route
                        path="*"
                        element={<Navigate to="/" replace/>}
                    />
                </Routes>
            </React.Fragment>
        </BrowserRouter>
    );


}