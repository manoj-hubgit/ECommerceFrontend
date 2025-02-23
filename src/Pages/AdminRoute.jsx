import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
   const {currentUser}=useSelector((state)=>state.user);
   console.log(currentUser.isAdmin);
   return currentUser && currentUser.isAdmin ? <Outlet/> : <Navigate to="/"/> 
};

export default AdminRoute;