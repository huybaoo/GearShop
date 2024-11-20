import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import '../css/Register.css';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                Name: name,
                Email: email,
                Phone: phone,
                Address: address, // Đảm bảo trường này được viết đúng
                Username: username,
                Password: password,
            });
            console.log(response.data);
            navigate('/login'); // Chuyển hướng đến trang đăng nhập hoặc trang khác
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error.response ? error.response.data : error.message);
            // Có thể hiển thị thông báo lỗi cho người dùng
        }
    };
    
    return (
        <div className="login-container">
            <div className="Register-box">
                <h2>Đăng kí</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Đăng Kí</button>
                </form>
            </div>
        </div>
    );
};

export default Register;