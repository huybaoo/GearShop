import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AdminProductList.css';
import AdminHeader from './AdminHeader';

const AdminProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState({
        Name: '',
        Description: '',
        Price: '',
        Img: '',
        Type: '',
        Brand: ''
    });
    const [editProductId, setEditProductId] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/product');
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/product', newProduct);
            setProducts([...products, res.data]);
            setNewProduct({ Name: '', Description: '', Price: '', Img: '', Type: '', Brand: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditProduct = async (id) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/product/${id}`, newProduct);
            setProducts(products.map(prod => (prod._id === id ? res.data : prod)));
            setEditProductId(null);
            setNewProduct({ Name: '', Description: '', Price: '', Img: '', Type: '', Brand: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/product/${id}`);
            setProducts(products.filter(prod => prod._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <AdminHeader />
        <div className="product-list">
            <h2>Danh sách Sản phẩm</h2>
            <div className="add-product">
                <input
                    type="text"
                    name="Name"
                    value={newProduct.Name}
                    onChange={handleInputChange}
                    placeholder="Tên sản phẩm"
                />
                <input
                    type="text"
                    name="Description"
                    value={newProduct.Description}
                    onChange={handleInputChange}
                    placeholder="Mô tả"
                />
                <input
                    type="text"
                    name="Price"
                    value={newProduct.Price}
                    onChange={handleInputChange}
                    placeholder="Giá"
                />
                <input
                    type="text"
                    name="Img"
                    value={newProduct.Img}
                    onChange={handleInputChange}
                    placeholder="Đường dẫn hình ảnh"
                />
                <input
                    type="text"
                    name="Type"
                    value={newProduct.Type}
                    onChange={handleInputChange}
                    placeholder="Loại"
                />
                <input
                    type="text"
                    name="Brand"
                    value={newProduct.Brand}
                    onChange={handleInputChange}
                    placeholder="Thương hiệu"
                />
                {editProductId ? (
                    <button onClick={() => handleEditProduct(editProductId)}>Cập nhật</button>
                ) : (
                    <button onClick={handleAddProduct}>Thêm</button>
                )}
            </div>
            <ul>
                {products.map(product => (
                    <li key={product._id} className="product-item">
                        {editProductId === product._id ? (
                            <div>
                                <input
                                    type="text"
                                    name="Name"
                                    value={newProduct.Name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="Description"
                                    value={newProduct.Description}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="Price"
                                    value={newProduct.Price}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="Img"
                                    value={newProduct.Img}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="Type"
                                    value={newProduct.Type}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="Brand"
                                    value={newProduct.Brand}
                                    onChange={handleInputChange}
                                />
                                <button onClick={() => handleEditProduct(product._id)}>Lưu</button>
                                <button onClick={() => { setEditProductId(null); setNewProduct({ Name: '', Description: '', Price: '', Img: '', Type: '', Brand: '' }); }}>Hủy</button>
                            </div>
                        ) : (
                            <div>
                                <h4>{product.Name}</h4>
                                <div className="imageproduct"><img src={`${process.env.PUBLIC_URL}/${product.Img}`} alt={product.Name} /></div>
                                <div className="priceandbutton">
                                <div className="priceproduct">{product.Price}đ</div>
                                <div className="button-group">
                                    <button onClick={() => { setEditProductId(product._id); setNewProduct(product); }}>Sửa</button>
                                    <button onClick={() => handleDeleteProduct(product._id)}>Xóa</button>
                                </div>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default AdminProductList;