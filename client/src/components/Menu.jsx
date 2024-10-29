import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Menu.css';

const Menu = () => {
    return (
        <div className="menu">
            <nav>
                <ul>
                    <li className="textmenu">
                        <Link to="/">Laptop</Link>
                    </li>
                    <li className="textmenu">
                        <Link to="/">Màn hình</Link>
                    </li>
                    <li className="textmenu">
                        <Link to="/">Linh kiện</Link>
                    </li>
                    <li className="textmenu">
                        <Link to="/">Gear</Link>
                    </li>
                    <li className="textmenu">
                        <Link to="/">Phụ kiện/Bàn ghế</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;