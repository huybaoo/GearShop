import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/ProductList.css';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

const ManhinhProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(''); // Thêm state cho thông báo
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/product');
                const filteredProducts = res.data.filter(product => product.Type === "6726460fd0296c8ef92ad070");
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
            existingProduct.quantity += 1; // Tăng số lượng lên 1
        } else {
            cart.push({ 
                productId: product._id, 
                productName: product.Name, 
                price: product.Price, 
                image: product.Img,   
                quantity: 1 // Mặc định số lượng là 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        setNotification(`Thêm 1 ${product.Name} vào giỏ hàng thành công!`); // Cập nhật thông báo

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    const handleBuyNow = (product) => {
        handleAddToCart(product); // Thêm sản phẩm vào giỏ hàng
        navigate('/cart'); // Điều hướng đến trang giỏ hàng
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Header />
            <Menu />
            {notification && (
                <div className="notification">{notification}</div> // Khung thông báo
            )}
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

export default ManhinhProductList;