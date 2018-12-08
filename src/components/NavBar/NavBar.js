import React from 'react';
import { NavLink } from 'react-router-dom'
import './navBar.css'

const toggleMenu = (onShowNav, event) => {
    onShowNav(event);
}

const NavBar = (props) => {
    const active = props.showNavBar;
    return (
        <div className="head-container flex">
            <div className={`hamburger ${active}`} onClick={event => toggleMenu(props.onShowNav, event)}></div>
            <ul className={`nav-list flex flex-wrap margin-zero text-align-center ${active}`}>
                <li className="nav-item list-item flex justify-center align-items-center">
                    <NavLink to="/" exact activeStyle={{ color: '#47a3d8' }} >My Locations</NavLink>
                </li>
                <li className="nav-item list-item flex justify-center align-items-center">
                    <NavLink to="/category" exact activeStyle={{ color: '#47a3d8' }} >My categories</NavLink>
                </li>
                <li className="nav-item list-item flex justify-center align-items-center">
                    <NavLink to="/about-me" activeStyle={{ color: '#47a3d8' }} >About Me</NavLink>
                </li>
            </ul>
        </div>

    );
};

export default NavBar;


