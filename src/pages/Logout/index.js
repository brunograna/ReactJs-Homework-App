import React from "react";
import {Redirect} from "react-router-dom";
import {logout} from "../../services/auth";

function Logout() {
    logout();

    return (
        <Redirect path="/sign-in" />
    );
};

export default Logout;