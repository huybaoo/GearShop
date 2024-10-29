import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from './Footer';

const Cart = () => {
    return (
        <div>
            <Header />
            <Menu />
            <h1>Giỏ hàng</h1>
            <Footer />
        </div>
    );
};

export default Cart;