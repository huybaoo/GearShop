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
        const relatedProducts = await Product.find({ Type: req.params.type }).limit(4);
        res.json(relatedProducts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Định nghĩa schema và model cho Category
const categorySchema = new mongoose.Schema({
    Type: String
    }, { collection: 'category' });
    
    const Category = mongoose.model('Category', categorySchema);

// API lấy danh sách category
app.get('/api/category', async (req, res) => {
    try {
    const categories = await Category.find();
    res.json(categories);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    });

// API để thêm category
app.post('/api/category', async (req, res) => {
    const newCategory = new Category({ Type: req.body.Type });
    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API để sửa category
app.put('/api/category/:id', async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category không tìm thấy" });
        }
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API để xóa category
app.delete('/api/category/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category không tìm thấy" });
        }
        res.json({ message: "Category đã bị xóa" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API lấy danh sách sản phẩm
app.get('/api/product', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API để thêm sản phẩm
app.post('/api/product', async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API để sửa sản phẩm
app.put('/api/product/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API để xóa sản phẩm
app.delete('/api/product/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
        }
        res.json({ message: "Sản phẩm đã bị xóa" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API để tìm kiếm sản phẩm theo tên
app.get('/api/search', async (req, res) => {
    const { query } = req.query; // Lấy từ query string
    try {
        const products = await Product.find({ Name: { $regex: query, $options: 'i' } }); // Tìm kiếm không phân biệt chữ hoa thường
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Định nghĩa schema và model cho giỏ hàng
const cartSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // Tham chiếu đến khách hàng
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }
    ]
}, { collection: 'cart' });

const Cart = mongoose.model('Cart', cartSchema);

// API để thêm sản phẩm vào giỏ hàng
app.post('/api/cart', async (req, res) => {
    const { customer_id, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ customer_id });

        if (cart) {
            // Nếu giỏ hàng đã tồn tại, kiểm tra sản phẩm đã có chưa
            const existingProduct = cart.products.find(item => item.productId.equals(productId));

            if (existingProduct) {
                // Nếu sản phẩm đã có, cập nhật số lượng
                existingProduct.quantity += quantity;
            } else {
                // Nếu không, thêm sản phẩm mới vào giỏ hàng
                cart.products.push({ productId, quantity });
            }
            await cart.save();
        } else {
            // Nếu giỏ hàng chưa tồn tại, tạo mới
            cart = new Cart({ customer_id, products: [{ productId, quantity }] });
            await cart.save();
        }

        res.status(201).json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Định nghĩa schema và model cho Customer
const customerSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Phone: Number,
    Address: String,
    Username: String,
    Password: String
}, { collection: 'customer' });

const Customer = mongoose.model('Customer', customerSchema);

// API đăng nhập
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const customer = await Customer.findOne({ Username: username, Password: password });
        if (!customer) {
            return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
        }
        // Chỉ gửi tên người dùng về client
        res.status(200).json({ message: 'Đăng nhập thành công', customer: { Name: customer.Name } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// API để đăng ký người dùng
app.post('/api/register', async (req, res) => {
    const { name, email, phone, address, username, password } = req.body;

    const newCustomer = new Customer({
        Name: name,
        Email: email,
        Phone: phone,
        Address: address,
        Username: username,
        Password: password
    });

    try {
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Định nghĩa schema và model cho admin
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: 'admin' });

const Admin = mongoose.model('Admin', adminSchema);

app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username: username, password: password });
        if (!admin) {
            return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
        }
        
        res.status(200).json({ message: 'Đăng nhập thành công', admin: { Name: admin.username } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


const vnpayRouter = require('./routes/vnpay'); 
// Sử dụng router VNPAY
app.use('/api/v1/vnpay', vnpayRouter);