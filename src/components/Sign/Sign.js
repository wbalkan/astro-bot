import React from "react";
import { Link } from "react-router-dom";

import './Sign.css';

const Sign = (props) => {
    return (
        <div className="link-box">
            <Link className="link" to={{
                pathname: '/choice', 
                search: `?sign=${props.sign}`
            }}>
            </Link>
        </div>
    )
}

export default Sign;