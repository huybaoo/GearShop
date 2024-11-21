import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AdminCategory.css';
import AdminHeader from './AdminHeader';

const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState("");
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");
    const [confirmAction, setConfirmAction] = useState({ visible: false, action: null, id: null, name: "" }); // State cho khung xác nhận

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

    const handleAddCategory = () => {
        setConfirmAction({ visible: true, action: 'add', name: newCategory }); // Hiển thị khung xác nhận thêm
    };

    const handleEditCategory = (id) => {
        setConfirmAction({ visible: true, action: 'edit', id, name: editCategoryName }); // Hiển thị khung xác nhận sửa
    };

    const confirmAddCategory = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/category', { Type: newCategory });
            setCategories([...categories, res.data]);
            setNewCategory("");
            setConfirmAction({ visible: false, action: null, id: null, name: "" }); // Ẩn khung xác nhận
        } catch (err) {
            setError(err.message);
        }
    };

    const confirmEditCategory = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/category/${confirmAction.id}`, { Type: confirmAction.name });
            setCategories(categories.map(cat => (cat._id === confirmAction.id ? res.data : cat)));
            setEditCategoryId(null);
            setEditCategoryName("");
            setConfirmAction({ visible: false, action: null, id: null, name: "" }); // Ẩn khung xác nhận
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteCategory = (id) => {
        setConfirmAction({ visible: true, action: 'delete', id }); // Hiển thị khung xác nhận xóa
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/category/${confirmAction.id}`);
            setCategories(categories.filter(cat => cat._id !== confirmAction.id));
            setConfirmAction({ visible: false, action: null, id: null, name: "" }); // Ẩn khung xác nhận
        } catch (err) {
            setError(err.message);
        }
    };

    const cancelAction = () => {
        setConfirmAction({ visible: false, action: null, id: null, name: "" }); // Ẩn khung xác nhận
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
                        type="text"
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
                                        type="text" 
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
                {confirmAction.visible && (
                    <div className="confirm-dialog">
                        {confirmAction.action === 'delete' && <p>Bạn có chắc chắn muốn xóa category này?</p>}
                        {confirmAction.action === 'add' && <p>Bạn có chắc chắn muốn thêm category "{confirmAction.name}" không?</p>}
                        {confirmAction.action === 'edit' && <p>Bạn có chắc chắn muốn sửa category thành "{confirmAction.name}" không?</p>}
                        <button onClick={confirmAction.action === 'delete' ? confirmDelete : confirmAction.action === 'add' ? confirmAddCategory : confirmEditCategory}>
                            Có
                        </button>
                        <button onClick={cancelAction}>Không</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCategory;