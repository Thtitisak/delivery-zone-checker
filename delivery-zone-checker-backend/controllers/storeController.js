
const Store = require('../models/Store');

// ฟังก์ชันสำหรับเพิ่มร้านค้าใหม่
exports.addStore = async (req, res) => {
    const { name, location, radius } = req.body;
    
    try {
        const newStore = new Store({ name, location, radius });
        await newStore.save();
        res.status(201).json(newStore);
    } catch (error) {
        res.status(500).json({ error: 'Error adding store' });
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลร้านค้าทั้งหมด
exports.getStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stores' });
    }
};

// ฟังก์ชันสำหรับตรวจสอบโซนการจัดส่ง
exports.checkDeliveryZone = async (req, res) => {
    const { userLocation } = req.body; // { lat, lon }

    try {
        const stores = await Store.find();
        const nearbyStores = stores.filter(store => {
            const distance = getDistance(store.location, userLocation);
            return distance <= store.radius;
        });

        res.json({ stores: nearbyStores });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stores' });
    }
};

// ฟังก์ชันคำนวณระยะทาง
function getDistance(loc1, loc2) {
    const R = 6371000; // รัศมีของโลก (เมตร)
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLon = (loc2.lon - loc1.lon) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // ระยะทางในเมตร
}
