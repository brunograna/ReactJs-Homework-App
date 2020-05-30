import React from "react";
import "./styles.css";
import {getDecodedToken} from "../../services/auth";
import {Link} from "react-router-dom";

function Navbar({childIsAuthenticated}) {
    console.log(`Navbar - Rendered - isAuthenticated: ${childIsAuthenticated()}`);

    if (childIsAuthenticated()) {
        const tokenDecoded = getDecodedToken();
        return (
            <div id="top-tab">
                <Link to='/' >
                    <img id="profile-image"
                         src={tokenDecoded != null ? tokenDecoded.avatar : ''}
                         alt={tokenDecoded != null ? tokenDecoded.username : ''}/>
                     <span id='profile-name'>{tokenDecoded != null ? tokenDecoded.username : ''}</span>
                </Link>
            </div>
        );
    }
    return (
        <>
        </>
    );

}

export default Navbar;