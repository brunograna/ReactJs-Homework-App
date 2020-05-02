import React from "react";
import {Redirect, Route} from "react-router-dom";
import {isAuthenticated} from "../auth";

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} >
            {
                isAuthenticated() ? (
                    <Component />
                ) : (
                    <Redirect push to="/sign-in" />
                )
            }
        </Route>
    );
};

export default PrivateRoute;