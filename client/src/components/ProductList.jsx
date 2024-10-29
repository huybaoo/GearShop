import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/product');
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="product-list">
            <ul>
                {products.map(product => (
                    <li key={product._id} className="product-item">
                        <Link to={`/product/${product._id}`}>
                            <img src={`${process.env.PUBLIC_URL}/${product.Img}`} alt={product.Name} /> {/* Cập nhật đường dẫn */}
                            <h4>{product.Name}</h4>
                            <div className="priceproduct">{product.Price}đ</div>
                        </Link>
                        <div className="button-group">
                            <button className="btn-add-to-cart">Thêm vào giỏ hàng</button>
                            <button className="btn-buy-now">Mua ngay</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
