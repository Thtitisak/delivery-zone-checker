
const { body, validationResult } = require('express-validator');

//สำหรับตรวจสอบข้อมูลการเพิ่มร้านค้า
exports.validateStore = [
    body('name').notEmpty().withMessage('Name is required'),
    body('location').isObject().withMessage('Location must be an object'),
    body('location.lat').isFloat().withMessage('Latitude must be a number'),
    body('location.lon').isFloat().withMessage('Longitude must be a number'),
    body('radius').isInt({ gt: 0 }).withMessage('Radius must be a positive integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
