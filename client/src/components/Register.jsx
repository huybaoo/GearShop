import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import '../css/Register.css';

const Register = () => {
    return (
        <div className="login-container">
            <div className="Register-box">
                <h2>Đăng kí </h2>
                <form>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Phone" />
                    <input type="password" placeholder="Adress" />
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Password" />
                    <button type="submit">Đăng Kí </button>
                </form>

            </div>
        </div>
    );
};

export default Register;