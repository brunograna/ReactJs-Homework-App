import React from "react";
import {Link} from "react-router-dom";
import Button from "../../components/Button";

function Home() {
    return (
        <>
            <h1 className="title">Home</h1>
            <Button to="/activities/1" title="Revisar envio"/>
        </>
    );
}

export default Home;