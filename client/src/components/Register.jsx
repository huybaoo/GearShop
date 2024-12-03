import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                name: name, 
                email: email, 
                phone: phone, 
                address: address, 
                password: password, 
            });

            console.log(response.data);
            setMessage('Đăng ký thành công!');
            setTimeout(() => {
                navigate('/login');
            }, 3500);
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error.response ? error.response.data : error.message);
            setMessage(error.response ? error.response.data.message : 'Đăng ký không thành công. Vui lòng thử lại.');
        }
    };
    
    return (
        <div className="login-container">
            <div className="Register-box">
                <h2>Đăng ký</h2>
                {message && <div className="message">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Đăng Kí</button>
                </form>
            </div>
        </div>
    );
};

export default Register;