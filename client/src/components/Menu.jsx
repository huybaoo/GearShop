import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Menu.css';

const Menu = () => {
    return (
        <div className="menu">
            <nav>
                <ul>
                    <li className="textmenu">
                        <Link to="/laptop">Laptop</Link>
                    </li>
                    <li className="textmenu">
                        <Link to="/manhinh">Màn hình</Link>
                    </li>
                    <li className="textmenu">
                        <Link to="/linhkien">Linh kiện</Link>
                    </li>
                    <li className="textmenu">
                        <Link to="/gear">Gear</Link>
                    </li>
                    <li className="textmenu">
                        <Link to="/phukienbanghe">Phụ kiện/Bàn ghế</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;