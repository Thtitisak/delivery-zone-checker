const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const storeController = require('./controllers/storeController'); // นำเข้า Controller

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost:27017/deliveryZoneChecker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Route สำหรับเพิ่มร้านค้า
app.post('/add-store', storeController.addStore);

// Route สำหรับดึงข้อมูลร้านค้า
app.get('/stores', storeController.getStores);

// Route สำหรับตรวจสอบโซนการจัดส่ง
app.post('/check-delivery', storeController.checkDeliveryZone);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
