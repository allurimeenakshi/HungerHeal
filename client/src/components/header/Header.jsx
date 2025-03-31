import React from 'react';
import './header.css';
import logo from '../../assets/favicon.png';
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className='header-container'>
            <nav className='header-navbar'>
                <div className='header-logo'>
                    <img src={logo} alt="HungerHeal Logo" className='logo-img' />
                    <h2>HungerHeal</h2>
                </div>
                <ul className='header-nav-links'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="donate-food">Donate Food</Link></li>
                    <li><Link to="request-food">Request Food</Link></li>
                    <li><Link to="track">Track</Link></li>
                    <li><Link to="feedback">Feedback</Link></li>
                    <li><Link to='auth' className='header-signin-btn'>Register/Login</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;