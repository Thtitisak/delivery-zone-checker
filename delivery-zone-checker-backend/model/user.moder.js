
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // ชื่อผู้ใช้ต้องไม่ซ้ำกัน
    },
    password: {
        type: String,
        required: true // รหัสผ่าน
    },
    email: {
        type: String,
        required: true,
        unique: true // อีเมลต้องไม่ซ้ำกัน
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // อ้างอิงถึง Role Model
        required: true // บทบาทของผู้ใช้
    },
    createdAt: {
        type: Date,
        default: Date.now // วันที่สร้างผู้ใช้
    },
    updatedAt: {
        type: Date,
        default: Date.now // วันที่อัปเดตผู้ใช้
    }
});

// สร้างโมเดลจาก schema
const User = mongoose.model('User', userSchema);

module.exports = User;
