import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavLinks({ loggedIn = true }) {
    console.log(
        "NavLinks line 5, I think this should check the 'lifetracker_token' in local storage"
    );
    const [log, setLog] = useState(true);
    return (
        <div className="nav-links">
            <Link to="/activity">Activity</Link>
            <Link to="/nutrition">Nutrition</Link>
            <button
                className={log ? "hidden logout-button" : "logout-button"}
                onClick={() => {
                    setLog(!log);
                    //change from button to Link
                    console.log("setup log out");
                    //remove the `lifetracker_token` from local storage and refresh the page so that all user data is reset
                }}
            >
                Log out
            </button>

            <Link
                to="/login"
                className={log ? "" : "hidden"}
                onClick={() => {
                    // setLog(!log);
                    console.log("setup log out");
                }}
            >
                Login
            </Link>
            <Link to="/register" className={log ? "" : "hidden"}>
                Sign Up
            </Link>
        </div>
    );
}
