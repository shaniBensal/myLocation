import React from 'react';
import { NavLink } from 'react-router-dom'
import './navBar.css'

const NavBar = () => {
    return (
        <ul className='nav-list flex flex-wrap margin-zero text-align-center'>
            <li className="nav-item list-item flex justify-center align-items-center">
                <NavLink to="/location" exact activeStyle={{ color: '#47a3d8' }} >My Locations</NavLink>
            </li>
            <li className="nav-item list-item flex justify-center align-items-center">
                <NavLink to="/category" exact activeStyle={{ color: '#47a3d8' }} >My categories</NavLink>
            </li>
            <li className="nav-item list-item flex justify-center align-items-center">
                <NavLink to="/about-me" activeStyle={{ color: '#47a3d8' }} >About Me</NavLink>
            </li>
        </ul>
    );
};

export default NavBar;


