import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Menu from './Menu';
import '../css/Home.css'
import axios from 'axios';
import ProductList from './ProductList';
import Footer from './Footer';

const Home = () => {

    return (
        <div>
            <Header />
            <Menu />
            <div className="thumbnail">
                <img src="https://global-uploads.webflow.com/60af8c708c6f35480d067652/61d1b96ac77bbfa4c23b89a1_screenshot_1641134415.png" />
            </div>
            <h1>Sản phẩm</h1>
            <ProductList />
            <Footer />
        </div>
    );
};

export default Home;