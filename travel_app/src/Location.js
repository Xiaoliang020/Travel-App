import React, { useEffect, useState } from 'react';
import './App.css';

const Location = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
      // Check if the browser supports geolocation
      if ("geolocation" in navigator) {
        // navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }, []);
  
    // Success callback function
    const onSuccess = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setLatitude(lat);
      setLongitude(lng);
  
      console.log("Latitude: " + lat);
      console.log("Longitude: " + lng);
    };
  
    // Error callback function
    const onError = (error) => {
      console.log("Error code: " + error.code);
      console.log("Error message: " + error.message);
    };
  
    return (
      <div>
        <h1>Location Information</h1>

        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>

      </div>
    );
  };
  
  export default Location;