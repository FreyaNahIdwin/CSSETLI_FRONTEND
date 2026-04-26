import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ homeI, messagesI, settingsI, peopleI }) {
    return (
        <nav className="navbar navbar-expand bg-dark fixed-top shadow py-2">
            <div className="container-fluid d-flex justify-content-center gap-4 gap-md-5">
                <Link to="/mainmenu">
                    <img className="icon" src={homeI} alt="Main Menu" style={{ width: "30px", height: "30px" }} />
                </Link>
                <Link to="/messages">
                    <img className="icon" src={messagesI} alt="Messages" style={{ width: "30px", height: "30px" }} />
                </Link>
                <Link to="/people">
                    <img className="icon" src={peopleI} alt="People" style={{ width: "30px", height: "30px" }} />
                </Link>
                <Link to="/settings">
                    <img className="icon" src={settingsI} alt="Settings" style={{ width: "30px", height: "30px" }} />
                </Link>
            </div>
        </nav>
    );
}