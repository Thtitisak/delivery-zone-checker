
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: {
        type: [String], // อนุญาตให้เป็นอาเรย์ของสตริงเพื่อเก็บสิทธิ์ที่เกี่ยวข้องกับบทบาทนี้
        default: []
    }
});

// สร้างโมเดลจาก schema
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
