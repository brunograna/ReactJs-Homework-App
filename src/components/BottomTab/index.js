import React from "react";
import "./styles.css";
import {Link} from "react-router-dom";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';

function BottomTab() {
    return (
        <div id="bottom-tab">
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            <HomeOutlinedIcon
                                style={{ color: '#FC206C', fontSize: 30 }}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="/activities/add">
                            <AddCircleOutlineOutlinedIcon
                                style={{ color: '#FC206C', fontSize: 30 }}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="/activities/me">
                            <ListAltOutlinedIcon
                                style={{ color: '#FC206C', fontSize: 30 }}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="/account">
                            <AccountCircleOutlinedIcon
                                style={{ color: '#FC206C', fontSize: 30 }}
                            />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default BottomTab;