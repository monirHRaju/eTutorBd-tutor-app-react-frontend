import React from 'react';
import { NavLink } from 'react-router';

const MyNavLink = ({ children, to, className = "" }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-primary-content font-semibold border-b-2 border-primary-content"
          : "text-primary-content/90 hover:text-primary-content hover:border-b-2 hover:border-primary-content " + className
      }
    >
      {children}
    </NavLink>
  );
};

export default MyNavLink;