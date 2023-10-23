import React from "react";

import Sign from "../../components/Sign/Sign";

import './Home.css';

import constellations from '../../assets/constellations.jpg';

const signs1 = ["aries", "taurus", "gemini", "cancer"]
const signs2 = ["leo", "virgo", "libra", "scorpio"]
const signs3 = ["sagittarius", "capricorn", "aquarius", "pisces"]

const Home = () => {
    return(
        <div>
            
            <div className="image-holder">
                <img src={constellations} className="constellations"/>
            </div>
            <div className="title">
                <div>SELECT</div>
                <div>YOUR</div>
                <div>SIGN</div>
            </div>
            <div className="signs1">{signs1.map( (key, id) => {
                return (
                    <div className="sign1">
                        <Sign  className="fill" sign={key}>{key}</Sign>
                    </div>
                )
            } )}</div>
            <div className="signs2">{signs2.map( (key, id) => {
                return (
                    <div className="sign2" >
                        <Sign sign={key}>{key}</Sign>
                    </div>
                )
            } )}</div>
            <div className="signs3">{signs3.map( (key, id) => {
                return (
                    <div className="sign3">
                        <Sign sign={key}>{key}</Sign>
                    </div>
                )
            } )}</div>
        </div>
    )
}

export default Home;