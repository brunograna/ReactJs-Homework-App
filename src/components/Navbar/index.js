import React from "react";
import "./styles.css";
import {getDecodedToken} from "../../services/auth";

function Navbar({childIsAuthenticated}) {
    if (childIsAuthenticated()) {
        const tokenDecoded = getDecodedToken();
        return (
            <div id="top-tab">
                <img id="profile-image"
                     src={tokenDecoded != null ? tokenDecoded.avatar : ''}
                     alt={tokenDecoded != null ? tokenDecoded.username : ''}/>
                 <span id='profile-name'>{tokenDecoded != null ? tokenDecoded.username : ''}</span>
            </div>
        );
    }
    return (
        <>
        </>
    );

}

export default Navbar;