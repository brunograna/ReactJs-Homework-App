import React from "react";
import "./styles.css";
import {isAuthenticated} from "../../services/auth";

function Navbar() {

    if (isAuthenticated()) {
        return (
            <div id="top-tab">
                <img id="profile-image"
                     src="https://oficinadainteligencia.com.br/wp-content/uploads/2019/07/opulent-profile-square-05.jpg"
                     alt="Your profile"/>
            </div>
        );
    }
    return (
        <>
        </>
    );

}

export default Navbar;