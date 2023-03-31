const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path')
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, "config/.env") })



app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/', payment);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    })
}

app.use(errorMiddleware)

module.exports = app;