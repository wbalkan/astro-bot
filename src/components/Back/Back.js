import React from "react";

import { Link } from "react-router-dom";

import './Back.css';

const Back = (props) => {
    return (
        <div className="back-box">
            <Link className="back-button" to={props.path}>Back</Link>
        </div>
    )
}

export default Back;