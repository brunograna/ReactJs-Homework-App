import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";

function Logout({childSetIsAuthenticated}) {

    useEffect(() => {
        childSetIsAuthenticated(false);
    });

    return (
        <Redirect to="/sign-in" />
    );
};

export default Logout;