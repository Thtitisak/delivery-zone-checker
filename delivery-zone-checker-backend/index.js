
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const storeRoutes = require('./routes/storeRoutes'); // นำเข้า storeRoutes
const userRoutes = require('./routes/userRoutes'); // นำเข้า userRoutes
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// เชื่อมต่อกับ MongoDB
connectDB();

// ใช้ Router
app.use('/stores', storeRoutes); // เส้นทางสำหรับร้านค้า
app.use('/users', userRoutes); // เส้นทางสำหรับผู้ใช้

// ใช้ Middleware สำหรับจัดการข้อผิดพลาด
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
