
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // นำเข้าคอนโทรลเลอร์

// เส้นทางสำหรับเพิ่มผู้ใช้
router.post('/register', userController.registerUser);

// เส้นทางสำหรับเข้าสู่ระบบผู้ใช้
router.post('/login', userController.loginUser);

// เส้นทางสำหรับดึงข้อมูลผู้ใช้
router.get('/', userController.getUsers);

module.exports = router;
