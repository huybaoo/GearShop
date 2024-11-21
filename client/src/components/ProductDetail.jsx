import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../css/ProductDetail.css';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Footer from './Footer';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [notification, setNotification] = useState(''); // State cho thông báo

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/product/${id}`);
                setProduct(res.data);
                setLoading(false);

                const relatedRes = await axios.get(`http://localhost:5000/api/related-products/${res.data.Type}`);
                setRelatedProducts(relatedRes.data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.productId === product._id);
    
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ 
                productId: product._id, 
                productName: product.Name, 
                price: product.Price, 
                image: product.Img,   
                quantity: quantity 
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        setNotification(`Thêm ${quantity} ${product.Name} vào giỏ hàng thành công!`); // Cập nhật thông báo

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            setNotification('');
        }, 3000);
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
            <div className="product-detail">
                <div className="product-info">
                    <div className="image-container">
                        <img src={`${process.env.PUBLIC_URL}/${product.Img}`} alt={product.Name} />
                    </div>
                    <div className="details-container">
                        <h1>{product.Name}</h1>
                        <p>{product.Description}</p>
                        <p>Giá: {product.Price} VNĐ</p>

                        <div className="quantity-control">
                            <button onClick={handleDecrease}>-</button>
                            <span>{quantity}</span>
                            <button onClick={handleIncrease}>+</button>
                        </div>
                        <button className="add-to-cart-button" onClick={handleAddToCart}>
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>

                <h2>Sản phẩm liên quan</h2>
                <div className="related-products">
                    {relatedProducts.map(relatedProduct => (
                        <div key={relatedProduct._id} className="related-product-item">
                            <Link to={`/product/${relatedProduct._id}`}>
                                <img src={`${process.env.PUBLIC_URL}/${relatedProduct.Img}`} alt={relatedProduct.Name} />
                                <h4>{relatedProduct.Name}</h4>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;