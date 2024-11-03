
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lon: {
            type: Number,
            required: true
        }
    },
    radius: {
        type: Number,
        required: true // รัศมีการจัดส่ง (กิโลเมตร)
    },
    address: {
        type: String,
        required: true // ที่อยู่ของร้าน
    },
    createdAt: {
        type: Date,
        default: Date.now // วันที่สร้างร้านค้า
    },
    updatedAt: {
        type: Date,
        default: Date.now // วันที่อัปเดตร้านค้า
    }
});

// สร้างโมเดลจาก schema
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
