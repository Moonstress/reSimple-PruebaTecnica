// Header.jsx
import React from 'react';
import logo from '../imgs/logo.png'; // Update with the correct path

const Header = ({ companyName }) => {
    return (
        <header className="header">
            <img src={logo} alt="Company Logo" className="logo" />
            <h1 className="company-name">
                Re<span style={{ color: '#68D982' }}>Simple</span>
            </h1>
        </header>
    );
};

export default Header;
