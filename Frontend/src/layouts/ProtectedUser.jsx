import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedUser() {

    const state = useSelector(store => store.auth);

    return (state?.user?.role == "guest" ? <Outlet /> : <Navigate to="/login" />)
}

export default ProtectedUser