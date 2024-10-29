import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer>
            <div class="footer-container">
                <div class="policy-section">
                    <h3>CHÍNH SÁCH</h3>
                    <ul>
                        <li>Tìm kiếm</li>
                        <li>Liên hệ</li>
                        <li>Trung tâm bảo hành</li>
                    </ul>
                </div>

                <div class="guide-section">
                    <h3>HƯỚNG DẪN</h3>
                    <ul>
                        <li>Hướng dẫn thanh toán</li>
                        <li>Hướng dẫn trả góp</li>
                        <li>Tra cứu bảo hành</li>
                        <li>Tuyển dụng</li>
                        <li>Tin công nghệ</li>
                        <li>Chính sách bảo hành</li>
                        <li>Chính sách đổi trả hoàn tiền</li>
                    </ul>
                </div>

                <div class="support-section">
                    <h3>TỔNG ĐÀI HỖ TRỢ</h3>
                    <div class="support-info">
                        <p>Hồ Chí Minh: 093 373 1881</p>
                        <p>Hà Nội: 097 232 1881</p>
                        <p>Hotline: 028 7108 1881</p>
                    </div>
                </div>
            </div>
        </footer >
    );
};
export default Footer;