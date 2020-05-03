import React from "react";
import "./styles.css";

function Navbar({childIsAuthenticated}) {

    if (childIsAuthenticated()) {
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