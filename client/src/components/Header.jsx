import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; // Tùy chọn: thêm CSS nếu cần

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Xử lý tìm kiếm ở đây, ví dụ: redirect tới trang tìm kiếm
        console.log('Tìm kiếm:', searchTerm);
    };
    /*https://file.hstatic.net/200000837185/file/logo-web-white-2_d77f90f6d67c47bea3c129624300ba8f.png*/
    return (
        <header>
            <nav>
                <ul>
                    <div className="header-logo">
                        <a href="/">
                            <img src="https://file.hstatic.net/200000837185/file/logo-web-white-2_d77f90f6d67c47bea3c129624300ba8f.png" />
                        </a>
                    </div>
                    <form onSubmit={handleSearchSubmit} className="headersearch-form">
                        <input
                            type="headertext"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button type="submit">Tìm</button>
                    </form>
                    <div className="header-logo">
                        <a href="/login">
                            <img src="https://cdn-icons-gif.flaticon.com/11186/11186790.gif" />
                        </a>
                    </div>
                    <div className="header-logo">
                        <a href="/cart">
                            <img src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG59.png" />
                        </a>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;