// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Home from './components/Home';
import Details from './components/Details';
import Header from './components/Header';
import Login from './components/Login';
import Cart from './components/Cart';
import Menu from './components/Menu';
import Register from './components/Register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details" element={<Details />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/register" element={<Register />} />
                <Route path="/productlist" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
