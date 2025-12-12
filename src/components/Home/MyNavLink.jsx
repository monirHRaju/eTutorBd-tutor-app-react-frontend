import React from 'react';
import { NavLink } from 'react-router';

const MyNavLink = ({children, to}) => {
    return (
        <NavLink 
        to={to} 
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold border-b-2 border-primary"
            : "hover:border-b-2 hover:border-primary"
        }
        >
            {children}
        </NavLink>
    );
};

export default MyNavLink;