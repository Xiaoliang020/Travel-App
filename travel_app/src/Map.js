import { useState, useEffect } from 'react';
import {GoogleMap, useLoadScript, MarkerF} from '@react-google-maps/api';
import './App.css';

export default function MapFragment() {
    const [currentPosition, setCurrentPosition] = useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
      // Get the user's current geolocation coordinates
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error retrieving geolocation:', error);
        }
      );
    }, []);

    if (!isLoaded) return <div>Loading..</div>
    return (
        <GoogleMap 
            zoom={14} 
            center={currentPosition} 
            mapContainerClassName="map-container"
        >
          <MarkerF position={currentPosition} />
        </GoogleMap>
    );
}
