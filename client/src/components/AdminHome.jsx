import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import '../css/AdminHome.css'

const AdminHome = () => {
    return(
        <div>
        <AdminHeader />
        <h1 className="adminhomeh1">TRANG QUẢN TRỊ GEARSHOP</h1>
        </div>
);
};

export default AdminHome;