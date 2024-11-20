import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/ProductList.css';
import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const query = new URLSearchParams(useLocation().search).get('query'); // Lấy query từ URL

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/search?query=${query}`);
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [query]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Header />
            <Menu />
        <div className="product-list">
            <h2>Kết quả tìm kiếm cho: "{query}"</h2>
            <ul>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product._id} className="product-item">
                            <Link to={`/product/${product._id}`}>
                                <img src={`${process.env.PUBLIC_URL}/${product.Img}`} alt={product.Name} />
                                <h4>{product.Name}</h4>
                            </Link>
                            <div className="priceandbutton">
                                <div className="priceproduct">{product.Price}đ</div>
                                <div className="button-group">
                                    <button className="btn-add-to-cart">Thêm vào giỏ hàng</button>
                                    <button className="btn-buy-now">Mua ngay</button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <div>Không tìm thấy sản phẩm nào.</div>
                )}
            </ul>
        </div>
        <Footer />
        </div>
    );
};

export default SearchResults;