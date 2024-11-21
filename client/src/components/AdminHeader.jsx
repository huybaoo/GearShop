import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/AdminHeader.css'; 

const AdminHeader = () => {
    return(
        <header>
            
            <nav className="linkadminheader">
                <a className="trangchu" href="/admin">Trang chủ</a>
                <a className="quanliloai" href="/admin/admincategory">Quản lý loại sản phẩm</a>
                <a className="quanlisanpham" href="/admin/adminproductlist">Quản lý sản phẩm</a>
                <a className="quanlitaikhoan" href='#'>Quản lí tài khoản</a>
                <a className="quanlihoadon" href='#'>Quản lí hóa đơn</a>
            </nav>
        </header>
);
};

export default AdminHeader;