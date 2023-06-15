import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import './App.css';

export default function MapFragment() {
  const [positions, setPositions] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    // Get the user's current geolocation coordinates
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPositions((prev) => [...prev, { lat: latitude, lng: longitude }]);
        },
        (error) => {
          console.error('Error retrieving geolocation:', error);
        }
      );
    }, 10000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return <div>Loading..</div>

  return (
    <GoogleMap
      zoom={14}
      center={positions[positions.length - 1]}
      mapContainerClassName="map-container"
    >
      {positions.map((position, index) => (
        <MarkerF key={index} position={position} />
      ))}

    </GoogleMap>
  );
}
