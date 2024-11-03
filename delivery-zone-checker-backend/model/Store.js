
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
        required: true
    }
});

// สร้างโมเดลจาก schema
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
