import React from "react";
import NCLogo from "../images/NC logo.jpg";
import '../css//Header.css';

export const Header = () => {
    return (
        <div className="Header_container">
        <header className="header">
            <img src={NCLogo} alt="Northcoders logo" className="header__logo" />
            <h1 className="header__title">NC NEWS</h1>
        </header>
        </div>
    );
}
