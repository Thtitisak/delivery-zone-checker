import React, { useState } from 'react';
import axios from 'axios';


const Map = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [message, setMessage] = useState('');
    const [stores, setStores] = useState([]);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lon: longitude });
                checkDeliveryZone({ lat: latitude, lon: longitude });
            });
        }
    };

    const checkDeliveryZone = async (location) => {
        try {
            const response = await axios.post('http://localhost:5000/check-delivery', { userLocation: location });
            if (response.data.stores.length > 0) {
                setMessage('คุณอยู่ในโซนการจัดส่ง');
                setStores(response.data.stores);
            } else {
                setMessage('การจัดส่งไม่สามารถใช้ได้');
                setStores([]);
            }
        } catch (error) {
            console.error('Error checking delivery zone:', error);
        }
    };

    return (
        <div>
            
            <h1>Software Specification Document for 
            Store Delivery Zone Checker</h1>
            <button onClick={handleGetLocation}>ระบุตำแหน่งปัจจุบัน</button>
            {message && <p>{message}</p>}
            {stores.length > 0 && (
                <div>
                    <h2>ร้านค้าที่ให้บริการจัดส่ง:</h2>
                    <ul>
                        {stores.map(store => (
                            <li key={store.id}>{store.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Map;
