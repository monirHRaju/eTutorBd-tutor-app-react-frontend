import React from 'react';
import { Link } from 'react-router';

const QuickLinks = () => {
    return (
        <>
            <Link to={"/"} className={'link link-hover'}>Home</Link>
            <Link to={"/tuitions"} className={'link link-hover'}>All Tuitions</Link>
            <Link to={"/tutors"} className={'link link-hover'}>Tutors</Link>
            <Link to={"/contact"} className={'link link-hover'}>Contact</Link>
            <Link to={"/dashboard"} className={'link link-hover'}>Dashboard</Link>
        </>
    );
};

export default QuickLinks;