
import React, { useEffect, useRef } from 'react';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// ตั้งค่าไอคอน Marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const position = [51.505, -0.09];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

const LocationMap = ({ stores, userLocation }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: userLocation,
                zoom: 12,
            });

            // เพิ่มตัวชี้ตำแหน่งของผู้ใช้
            new window.google.maps.Marker({
                position: userLocation,
                map: map,
                title: 'Your Location',
            });

            // เพิ่มตัวชี้ตำแหน่งของร้านค้า
            stores.forEach(store => {
                new window.google.maps.Marker({
                    position: { lat: store.location.lat, lng: store.location.lng },
                    map: map,
                    title: store.name,
                });
            });
        }
    }, [stores, userLocation]);

    return (
        <div>
            <h2>Delivery Zone Map</h2>
            <div
                ref={mapRef}
                style={{ height: '400px', width: '100%' }}
            />
        </div>
    );
};

export default LocationMap;
