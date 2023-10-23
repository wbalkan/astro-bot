import React from "react";

import { Link, useLocation } from "react-router-dom";
import Back from "../../components/Back/Back";
import './Choice.css';

const Choice = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sign = queryParams.get('sign');

    return (
        <div>
            <Back path={{pathname: "/"}} />
            <Link className="horoscope" to={{
                pathname: "/horoscope",
                search: `?sign=${sign}`
            }}>Get Your Horoscope</Link>
            <Link className="chat" to={{
                pathname: "/advice",
                search: `?sign=${sign}`
            }}>Chat With a Zodiac Expert</Link>
        </div>
    )
}

export default Choice;