import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AdminCategory.css'
import AdminHeader from './AdminHeader';


const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState("");
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/category');
                setCategories(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/category', { Type: newCategory });
            setCategories([...categories, res.data]);
            setNewCategory("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditCategory = async (id) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/category/${id}`, { Type: editCategoryName });
            setCategories(categories.map(cat => (cat._id === id ? res.data : cat)));
            setEditCategoryId(null);
            setEditCategoryName("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/category/${id}`);
            setCategories(categories.filter(cat => cat._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <AdminHeader />
        <div className="category-list">
            <h2>Danh sách Category</h2>
            <div className="add-category">
                <input
                    Type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Thêm category mới"
                />
            <button onClick={handleAddCategory}>Thêm</button>
            </div>
            <ul>
                {categories.map(category => (
                    <li key={category._id} className="category-item">
                    {editCategoryId === category._id ? (
                        <>
                            <input 
                                Type="text" 
                                value={editCategoryName} 
                                onChange={(e) => setEditCategoryName(e.target.value)} 
                            />
                            <button onClick={() => handleEditCategory(category._id)}>Lưu</button>
                            <button onClick={() => { setEditCategoryId(null); setEditCategoryName(""); }}>Hủy</button>
                        </>
                    ) : (
                        <>
                            <h4>{category.Type}</h4>
                            <div className="button-group">
                                <button onClick={() => { setEditCategoryId(category._id); setEditCategoryName(category.Type); }}>Sửa</button>
                                <button onClick={() => handleDeleteCategory(category._id)}>Xóa</button>
                            </div>
                        </>
                    )}
                </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default AdminCategory;