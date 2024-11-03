
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController'); // นำเข้าคอนโทรลเลอร์

// เส้นทางสำหรับเพิ่มร้านค้า
router.post('/add', storeController.addStore);

// เส้นทางสำหรับดึงข้อมูลร้านค้า
router.get('/', storeController.getStores);

// เส้นทางสำหรับตรวจสอบโซนการจัดส่ง
router.post('/check-delivery', storeController.checkDeliveryZone);

module.exports = router;
