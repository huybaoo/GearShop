const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sử dụng mongoURI từ biến môi trường hoặc giá trị mặc định
const mongoURI = process.env.MONGO_URI || "mongodb+srv://nhom4:nhom4@cluster0.zmz8v.mongodb.net/gearshop";

// Kết nối MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Định nghĩa schema và model cho sản phẩm
const productSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Price: String,
    Img: String,
    Type: String,
    Brand: String
}, { collection: 'product' });

const Product = mongoose.model('Product', productSchema);

// API để lấy danh sách sản phẩm
app.get('/api/product', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API để lấy chi tiết sản phẩm theo ID
app.get('/api/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        // Nếu không tìm thấy sản phẩm với id tương ứng
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
        }

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server hoặc ID không hợp lệ" });
    }
});

app.get('/api/related-products/:type', async (req, res) => {
    try {
        const relatedProducts = await Product.find({ Type: req.params.type }).limit(4); // Giả sử bạn lấy 4 sản phẩm liên quan
        res.json(relatedProducts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
