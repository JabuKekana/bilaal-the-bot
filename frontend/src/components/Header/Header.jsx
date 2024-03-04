import React from 'react';
import './Header.css';
import defaultIcon from '../../assets/images/bot-img.png';

const Header = () => {
    return (
        <div className="navbar">
            <img src={defaultIcon}  alt="Logo" className="logo" />
            <a href="#" className="nav-link">Upload PDF</a>
            <a href="https://www.yourwebsite.com" className="nav-link">Upload Website Link</a>
        </div>
    );
}

export default Header;
