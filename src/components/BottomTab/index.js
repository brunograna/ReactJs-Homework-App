import React from "react";
import "./styles.css";
import {Link} from "react-router-dom";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';

function BottomTab({childIsAuthenticated}) {

    if (childIsAuthenticated()) {
        return (
            <div id="bottom-tab">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                <HomeOutlinedIcon className="icon" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/activities/add">
                                <AddCircleOutlineOutlinedIcon className="icon" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/activities/me">
                                <ListAltOutlinedIcon className="icon" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/account">
                                <AccountCircleOutlinedIcon className="icon" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
    return (
        <>
        </>
    );
}

export default BottomTab;