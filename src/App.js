import React from 'react';
import './global.css';
import './App.css';

import BottomTab from "./components/BottomTab";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ActivityForm from "./pages/ActivityForm";
import Home from "./pages/Home";
import Account from "./pages/Account";
import MyActivities from "./pages/MyActivities";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./services/PrivateRoute";
import Logout from "./pages/Logout";

function App() {
    return (
        <div>
            <Navbar />
            <Router>
                <main id="main-wrapper">
                    <Switch>
                        <Route path="/sign-in" component={SignIn} />
                        <Route path="/sign-up" component={SignUp} />
                        <Route path="/logout" component={Logout}  />
                        <PrivateRoute component={ActivityForm} path="/activities/add" />
                        <PrivateRoute component={MyActivities} path="/activities/me" />
                        <PrivateRoute component={Account} path="/account" />
                        <PrivateRoute component={Home} path="/" />

                    </Switch>
                </main>
                <BottomTab/>
            </Router>
        </div>
    );
}

export default App;
