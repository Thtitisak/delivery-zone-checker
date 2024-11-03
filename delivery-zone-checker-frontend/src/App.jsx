import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Popup, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Swal from "sweetalert2";
import "./App.css";

const base_url = import.meta.env.VITE_API_BASE_URL;

function App() {
  const center = [13.838024, 100.028286]; // กำหนดศูนย์กลางแผนที่
  const [stores, setStores] = useState([]);
  const [myLocation, setMyLocation] = useState({ lat: "", lng: "" });
  const [deliveryZone, setDeliveryZone] = useState({
    lat: 13.838024,
    lng: 100.028286,
    radius: 5000,
  });
  const [address, setAddress] = useState("");

  // ฟังก์ชันคำนวณระยะทางระหว่างสองจุด
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // รัศมีของโลกในเมตร
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // ระยะทางในเมตร
  };

  // ฟังก์ชันตรวจสอบเขตจัดส่ง
  const handleLocationCheck = () => {
    if (myLocation.lat === "" || myLocation.lng === "") {
      Swal.fire({
        title: "Error",
        text: "Location coordinates are missing.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const distance = calculateDistance(
      myLocation.lat,
      myLocation.lng,
      deliveryZone.lat,
      deliveryZone.lng
    );

    if (distance <= deliveryZone.radius) {
      Swal.fire({
        title: "Success",
        text: "You are within the delivery zone.",
        icon: "info",
        confirmButtonText: "OK",
      });
    } else {
      // แนะนำร้านค้าใกล้เคียง
      const nearbyStores = stores.filter(
        (store) =>
          calculateDistance(
            myLocation.lat,
            myLocation.lng,
            store.lat,
            store.lng
          ) <= 5000
      );

      let nearbyStoresList =
        nearbyStores
          .map((store) => `${store.name} (${store.address})`)
          .join("\n") || "ไม่มีร้านค้าใกล้เคียง";

      Swal.fire({
        title: "Error",
        text: `You are outside the delivery zone.\nNearby stores:\n${nearbyStoresList}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // ฟังก์ชันสำหรับแปลงที่อยู่เป็นพิกัด
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json`,
      {
        params: {
          q: address,
          key: "id", // เปลี่ยนเป็น API key ของคุณ
        },
      }
    );

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      setMyLocation({ lat, lng });
      Swal.fire(`Location found: ${lat}, ${lng}`);
    } else {
      Swal.fire("Location not found.");
    }
  };

  // ดึงข้อมูลร้านค้า
  useEffect(() => {
    axios
      .get(`${base_url}/stores`)
      .then((response) => {
        setStores(response.data);
        if (response.data.length > 0) {
          setDeliveryZone({
            lat: response.data[0].lat,
            lng: response.data[0].lng,
            radius: 5000,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching the stores: ", error);
      });
  }, []);

  return (
    <div>
      <form onSubmit={handleAddressSubmit}>
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Find Location</button>
      </form>

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stores.map((store) => (
          <Marker key={store.id} position={[store.lat, store.lng]}>
            <Popup>
              {store.name}
              <br />
              {store.address}
            </Popup>
          </Marker>
        ))}
        <Circle
          center={[deliveryZone.lat, deliveryZone.lng]}
          radius={deliveryZone.radius}
          color="blue"
          fillOpacity={0.2}
        />
      </MapContainer>
      <button onClick={handleLocationCheck}>Check Delivery Zone</button>
    </div>
  );
}

export default App;
