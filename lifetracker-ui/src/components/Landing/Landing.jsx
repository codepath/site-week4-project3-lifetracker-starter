import React from "react";
import sculpture from "src/components/Landing/sculpture.png";

export default function Landing() {
    return (
        <div className="landing-page">
            <div className="hero">
                <img src={sculpture} width="494px" className="hero-img" />
                <span className="title">Life Tracker</span>
                <span children="Sculpture Your Life" className="cta" />
            </div>
        </div>
    );
}
