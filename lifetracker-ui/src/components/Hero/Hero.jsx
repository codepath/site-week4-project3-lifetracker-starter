import * as React from "react";
import hero from "../../assets/hero.png"
import nutrition from '../../assets/nutrition.png';
import sleep from '../../assets/sleep.png';
import "./Hero.css";


export default function Hero() {
    return ( <div className="hero">
        <div className="intro">
            <img src={hero} alt="hero" className="hero-img" />
            <div className="cta">
                <h1>Welcome to Life Tracker 365</h1>
                <h2>Keep track of your routines and achieve your fullest potential</h2>
                <img src={nutrition} alt="green apple with nutrition under" />
                <img src={sleep} alt="green moon and 3 z's with sleep under" />
            </div>
        </div>
    </div>);
}