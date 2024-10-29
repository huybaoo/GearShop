import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../css/ProductDetail.css';
import Header from '../components/Header';
import Menu from '../components/Menu';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // State để lưu số lượng

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/product/${id}`);
                setProduct(res.data);
                console.log('Fetched Product:', res.data);
                setLoading(false);

                // Giả sử bạn có API để lấy sản phẩm liên quan
                const relatedRes = await axios.get(`http://localhost:5000/api/related-products/${res.data.Type}`);
                setRelatedProducts(relatedRes.data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        // Logic để thêm sản phẩm vào giỏ hàng
        console.log(`Thêm ${quantity} ${product.Name} vào giỏ hàng`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Header />
            <Menu />
            <div className="product-detail" >
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
        </div>
    );
};

export default ProductDetail;
