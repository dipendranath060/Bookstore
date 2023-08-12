import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedAdmin() {

    const state = useSelector(store => store.auth);

    return (state?.user?.role == "admin" ? <Outlet /> : <Navigate to="/login" />)
}

export default ProtectedAdmin