import React from "react";
import NCLogo from "../images/NC logo.jpg";
import '../css//Header.css';
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header" onClick={()=>{navigate('/')}}>
            <img src={NCLogo} alt="Northcoders logo" className="header__logo" />
            <h1 className="header__title">NC NEWS</h1>
        </header>
    );
}
