import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/ProductList.css';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

const PkbgProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/product');
                const filteredProducts = res.data.filter(product => 
                    product.Type === "6726496cd0296c8ef92ad07d" || 
                    product.Type === "6726495cd0296c8ef92ad07c"
                );
                setProducts(filteredProducts);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.productId === product._id);
        
        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity by 1
        } else {
            cart.push({ 
                productId: product._id, 
                productName: product.Name, 
                price: product.Price, 
                image: product.Img,   
                quantity: 1 // Default quantity to 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`Thêm 1 ${product.Name} vào giỏ hàng`);
    };

    const handleBuyNow = (product) => {
        handleAddToCart(product); // Add product to cart
        navigate('/cart'); // Redirect to cart page
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Header />
            <Menu />
            <div className="product-list">
                <ul>
                    {products.map(product => (
                        <li key={product._id} className="product-item">
                            <Link to={`/product/${product._id}`}>
                                <img src={`${process.env.PUBLIC_URL}/${product.Img}`} alt={product.Name} />
                                <h4>{product.Name}</h4>
                            </Link>
                            <div className="priceandbutton">
                                <div className="priceproduct">{product.Price}đ</div>
                                <div className="button-group">
                                    <button 
                                        className="btn-add-to-cart" 
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button 
                                        className="btn-buy-now" 
                                        onClick={() => handleBuyNow(product)}
                                    >
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default PkbgProductList;