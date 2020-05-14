import React from 'react';
import './global.css';
import './App.css';

import BottomTab from "./components/BottomTab";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ActivityForm from "./pages/ActivityForm";
import Home from "./pages/Home";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./services/PrivateRoute";
import Logout from "./pages/Logout";
import {getToken, isAuthenticated, logout, TOKEN_KEY} from "./services/auth";
import {useLocalStorage} from "./hooks/useLocalStorage";
import ActivitiesList from "./pages/ActivitiesList";
import ActivityDetail from "./pages/ActivityDetail";

function App() {
    const [tokenInLocalStorageState, setTokenInLocalStorageState] = useLocalStorage(TOKEN_KEY, getToken());

    function childSetIsAuthenticated(state) {
        if (state === false) {
            setTokenInLocalStorageState(null);
            logout();
        }
        setTokenInLocalStorageState(getToken());
    }
    function childIsAuthenticated() {
        return isAuthenticated();
    }

    return (
        <div>
            <Router>
                <Navbar childIsAuthenticated={childIsAuthenticated} />
                <main id="main-wrapper">
                    <Switch>
                        <Route path="/sign-in">
                            <SignIn childSetIsAuthenticated={childSetIsAuthenticated} />
                        </Route>
                        <Route path="/sign-up">
                            <SignUp childSetIsAuthenticated={childSetIsAuthenticated}/>
                        </Route>
                        <Route path="/logout">
                            <Logout childSetIsAuthenticated={childSetIsAuthenticated} />
                        </Route>
                        <PrivateRoute component={ActivityForm} path="/activities/add" />
                        <PrivateRoute component={ActivitiesList} path="/activities/me" />
                        <PrivateRoute component={ActivityDetail} path="/activities/:id" />
                        <PrivateRoute component={Account} path="/account" />
                        <PrivateRoute component={Home} path="/" />

                    </Switch>
                </main>
                <BottomTab childIsAuthenticated={childIsAuthenticated}/>
            </Router>
        </div>
    );
}

export default App;
