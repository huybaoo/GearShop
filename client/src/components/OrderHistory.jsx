import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import '../css/OrderHistory.css';
import Footer from './Footer';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const userName = JSON.parse(localStorage.getItem('user')).Name;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/name/${userName}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", error);
                alert("Không thể lấy lịch sử mua hàng.");
            }
        };

        if (!userName) {
            alert("Bạn cần đăng nhập để xem lịch sử mua hàng.");
            navigate('/login');
        } else {
            fetchOrders();
        }
    }, [userName, navigate]);

    return (
        <div className="order-history">
            <Header />
            <Menu />
            <h1 className="order-history__title">Lịch sử mua hàng</h1>
            {orders.length === 0 ? (
                <p className="order-history__empty">Không có đơn hàng nào.</p>
            ) : (
                <ul className="order-history__list">
                    {orders.map(order => (
                        <li key={order._id} className="order-history__item">
                            <h3 className="order-history__order-id">Đơn hàng ID: {order._id}</h3>
                            <p className="order-history__total-price">Tổng tiền: {order.totalPrice.toLocaleString("vi-VN")} VNĐ</p>
                            <p className="order-history__status">Trạng thái: {order.status}</p>
                            <p className="order-history__date">Ngày tạo: {new Date(order.createdAt).toLocaleString()}</p>
                            <h4 className="order-history__product-title">Chi tiết sản phẩm:</h4>
                            <ul className="order-history__product-list">
                                {order.products.map(product => (
                                    <li key={product._id} className="order-history__product-item">
                                        {product.name} - {product.quantity} x {product.price.toLocaleString("vi-VN")} VNĐ
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
            <Footer />
        </div>
    );
};

export default OrderHistory;