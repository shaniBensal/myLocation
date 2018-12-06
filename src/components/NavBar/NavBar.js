import React from 'react';
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <ul>
            <li>
                <NavLink to="/location" exact activeStyle={{ color: 'red' }} >My Locations</NavLink>
            </li>
            <li>
                <NavLink to="/category" exact activeStyle={{ color: 'red' }} >My categories</NavLink>
            </li>
            <li>
                <NavLink to="/about-me" activeStyle={{ color: 'red' }} >About Me</NavLink>
            </li>
        </ul>
    );
};

export default Header;
