import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css'; // Tùy chọn: thêm CSS nếu cần

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null); // Thêm state để lưu thông tin người dùng
    const navigate = useNavigate(); // Khai báo useNavigate để điều hướng

    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage khi component được render
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Chuyển đổi chuỗi JSON thành đối tượng
        }
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            // Chuyển hướng tới trang kết quả tìm kiếm
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Xóa thông tin người dùng
        setUser(null); // Đặt lại state user
        navigate('/'); // Chuyển hướng về trang đăng nhập
    };

    return (
        <header>
            <nav>
                <ul>
                    <div className="header-logo">
                        <a href="/">
                            <img src="https://file.hstatic.net/200000837185/file/logo-web-white-2_d77f90f6d67c47bea3c129624300ba8f.png" alt="Logo" />
                        </a>
                    </div>
                    <form onSubmit={handleSearchSubmit} className="headersearch-form">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button type="submit">Tìm</button>
                    </form>
                    <div className="header-logo">
                    {user ? (
                            <>
                                <span>{user.Name}</span> {/* Hiển thị tên người dùng */}
                                <button onClick={handleLogout}>Đăng xuất</button> {/* Nút đăng xuất */}
                            </>
                        ) : (
                            <a href="/login">
                                <img src="https://cdn-icons-gif.flaticon.com/11186/11186790.gif" alt="Login" />
                            </a>
                        )}
                    </div>
                    <div className="header-logo">
                        <a href="/cart">
                            <img src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG59.png" alt="Cart" />
                        </a>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;