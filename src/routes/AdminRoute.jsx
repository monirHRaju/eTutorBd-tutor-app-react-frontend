import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import Forbidden from '../components/Shared/Forbidden';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const {isLoading, role} = useRole()

    if(loading || isLoading) return <LoadingSpinner />

    if(role !== 'admin') return <Forbidden />

    return children
};

export default AdminRoute