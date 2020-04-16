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

function App() {
    return (
        <div>
            <Navbar />
            <Router>
                <main id="main-wrapper">
                    <Switch>
                        <Route path="/activities/add">
                            <ActivityForm />
                        </Route>
                        <Route path="/activities/me">
                            <MyActivities />
                        </Route>
                        <Route path="/account">
                            <Account />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </main>
                <BottomTab/>
            </Router>
        </div>
    );
}

export default App;
