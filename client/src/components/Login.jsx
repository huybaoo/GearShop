import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import '../css/Login.css'

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Đăng nhập</h2>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Đăng nhập</button>
                </form>
                <p>
                    Bạn chưa có tài khoản? <a href="/register">Đăng ký Tại đây</a>
                </p>
            </div>
        </div>
    );
};

export default Login;