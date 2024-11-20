const express = require('express');
const moment = require('moment');
const crypto = require('crypto');
const querystring = require('qs');
const config = require('config');

const router = express.Router();

router.post('/create_payment_url', function (req, res) {
    console.log("Received request:", req.body);

    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;

    if (!amount) {
        console.error("Số tiền bị thiếu");
        return res.status(400).send("Số tiền là bắt buộc");
    }

    console.log("Số tiền:", amount);

    let bankCode = req.body.bankCode || null;
    let locale = req.body.language || 'vn';
    let currCode = 'VND';

    let vnp_Params = {
        'vnp_Version': '2.1.0',
        'vnp_Command': 'pay',
        'vnp_TmnCode': tmnCode,
        'vnp_Locale': locale,
        'vnp_CurrCode': currCode,
        'vnp_TxnRef': orderId,
        'vnp_OrderInfo': 'Thanh toán cho mã GD:' + orderId,
        'vnp_OrderType': 'other',
        'vnp_Amount': amount * 100, // Chuyển đổi sang đơn vị tiền tệ VND
        'vnp_ReturnUrl': returnUrl,
        'vnp_IpAddr': ipAddr,
        'vnp_CreateDate': createDate,
    };

    if (bankCode) {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    console.log("Tham số thanh toán:", vnp_Params);

    // Sắp xếp các tham số theo thứ tự
    vnp_Params = sortObject(vnp_Params);
    let signData = querystring.stringify(vnp_Params, { encode: false });

    // Tạo chữ ký
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    console.log("URL đã tạo:", vnpUrl);

    res.send(vnpUrl);
});

router.get('/vnpay_return', function (req, res) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params = sortObject(vnp_Params);

    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    // Kiểm tra chữ ký
    if (secureHash === signed) {
        const orderStatus = vnp_Params['vnp_ResponseCode'] === '00' ? 'success' : 'error';
        const redirectToPaymentSuccessPage = (status) => `
        <html>
        <head>
        <meta http-equiv="refresh" content="0; url=http://localhost:3000/">
        </head>
        <body>
        <p>Redirecting to payment ${status} page...</p>
        </body>
        </html>`;
        
        res.status(200).send(redirectToPaymentSuccessPage(orderStatus));
    } else {
        console.error('Sai chữ ký');
        res.status(200).send('Sai chữ ký');
    }
});

function sortObject(obj) {
    return Object.keys(obj).sort().reduce((result, key) => {
        result[key] = obj[key];
        return result;
    }, {});
}

module.exports = router;