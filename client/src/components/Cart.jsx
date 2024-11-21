import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Menu from '../components/Menu';
import '../css/Cart.css';

const Cart = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentTime, setCurrentTime] = useState('');
    let timer;

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setSelectedProducts(storedCart);
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        };

        updateTime();
        timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleRemoveFromCart = (productId) => {
        const updatedCart = selectedProducts.filter(item => item.productId !== productId);
        setSelectedProducts(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleIncreaseQuantity = (productId) => {
        const updatedCart = selectedProducts.map(item => {
            if (item.productId === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setSelectedProducts(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleDecreaseQuantity = (productId) => {
        const updatedCart = selectedProducts.map(item => {
            if (item.productId === productId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setSelectedProducts(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const totalMoney = (items) => {
        return items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    const handlePayment = async () => {
        const storedUser = localStorage.getItem('user'); // Lấy thông tin người dùng từ localStorage
        if (!storedUser) {
            alert("Bạn cần đăng nhập để thực hiện thanh toán.");
            return;
        }

        try {
            if (selectedProducts.length === 0) {
                alert("Giỏ hàng của bạn trống. Không thể thanh toán.");
                return;
            }
    
            const total = totalMoney(selectedProducts);
            console.log("Tổng số tiền trước khi chuyển đổi:", total);
    
            if (total < 5000 || total >= 1000000000) {
                alert("Số tiền giao dịch không hợp lệ. Số tiền hợp lệ từ 5,000 đến dưới 1 tỷ đồng.");
                return;
            }
    
            const newPayment = {
                products: selectedProducts,
                amount: total, // Đảm bảo số tiền đã tính đúng
                bankcode: null,
                language: "vn",
            };
    
            console.log("Dữ liệu thanh toán:", newPayment);
    
            const response = await axios.post(
                "http://localhost:5000/api/v1/vnpay/create_payment_url",
                newPayment
            );
    
            if (response.status === 200 && response.data) {
                window.location.href = response.data; // Chuyển hướng đến URL thanh toán
            }
        } catch (error) {
            console.error('Lỗi trong quá trình thanh toán:', error);
            alert(`LỖI: ${error.message}`);
        }
    };

    return (
        <div>
            <Header />
            <Menu />
            <h1>Giỏ hàng</h1>
            <div id="timeDisplay">Thời gian hiện tại: {currentTime}</div>
            {selectedProducts.length === 0 ? (
                <p>Giỏ hàng của bạn trống.</p>
            ) : (
                <div className="cart-container">
                    <div className="cart-items">
                        {selectedProducts.map(item => (
                            <div key={item.productId} className="cart-item">
                                <img src={`/${item.image}`} alt={item.productName} />
                                <div className="cart-item-details">
                                    <h3>{item.productName}</h3>
                                    <p>Giá: {item.price} VNĐ</p>
                                    <div className="quantity-control">
                                        <button onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncreaseQuantity(item.productId)}>+</button>
                                    </div>
                                    <button onClick={() => handleRemoveFromCart(item.productId)}>Xóa</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Tổng tiền: {totalMoney(selectedProducts)} VNĐ</h2>
                        <button className="checkout-button" onClick={handlePayment}>Thanh toán</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;