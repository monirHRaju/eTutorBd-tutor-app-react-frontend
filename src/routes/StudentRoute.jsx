import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import Forbidden from '../components/Shared/Forbidden';
import { Navigate } from 'react-router';


const StudentRoute = ({children}) => {
    const {loading} = useAuth()
    const {isLoading, role} = useRole()


    if(loading || isLoading) return <LoadingSpinner />

    if (role !== 'student') {
            return <Forbidden></Forbidden>
            // return <Navigate to="/login"></Navigate>
        }

    return children
};

export default StudentRoute