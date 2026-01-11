import React from 'react';
import { NavLink } from 'react-router';

const MyNavLink = ({children, to}) => {
    return (
        <NavLink 
        to={to} 
        className={({ isActive }) =>
          isActive
            ? "text-secondary font-semibold border-b-2 border-secondary"
            : "hover:border-b-2 hover:border-primary"
        }
        >
            {children}
        </NavLink>
    );
};

export default MyNavLink;