import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Back from "../../components/Back/Back";

import './Horoscope.css';

const BACKEND_URL = "https://astrobot-backend.onrender.com";
//const BACKEND_URL = process.env.BACKEND_URL;

const Horoscope = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sign = queryParams.get('sign');

    const [horoscope, setHoroscope] = useState('Loading...');

    // call aztro api on render
    console.log(BACKEND_URL);
    const url = `${BACKEND_URL}/api/horoscope`
    useEffect( () => {
        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sign: sign }), // Send the sign as an object
        })
        .then(response => response.json())
        .then(data => {
            setHoroscope(data.horoscope);
        })
        .catch(error => {
            console.error('Failed to fetch horoscope:', error);
        });
    }, [url, sign])

    return (
        <div>
            <Back path={ {pathname:"/choice", search: `?sign=${sign}`}} />
            <div className="intro">Here is your horoscope for today...</div>
            <div className="horoscope-text">{horoscope}</div>
        </div>
    )
}

export default Horoscope;