import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF, PolylineF } from '@react-google-maps/api';
import './App.css';

export default function Map() {
  const [positions, setPositions] = useState([]);
  const [trackingEnabled, setTrackingEnabled] = useState(false); // State to track whether geolocation tracking is enabled

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    let interval;

    if (trackingEnabled) {
      // Immediately get the current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPositions((prev) => [...prev, { lat: latitude, lng: longitude }]);
          console.log("Got first location after click the button");
        },
        (error) => {
          console.error('Error retrieving geolocation:', error);
        }
      );

      // Start tracking location every 10 seconds
      interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPositions((prev) => [...prev, { lat: latitude, lng: longitude }]);
            console.log("Get a location");
          },
          (error) => {
            console.error('Error retrieving geolocation:', error);
          }
        );
      }, 10000);
    }

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [trackingEnabled]);

  const handleStartTracking = () => {
    setTrackingEnabled(true);
    console.log("Start tracking");
  };

  const handleStopTracking = () => {
    setTrackingEnabled(false);
    console.log("Stop tracking");
  };

  if (!isLoaded) return <div>Loading..</div>

  return (
    <div>
      <div>
        {trackingEnabled ? (
          <button 
            className="tracking-button tracking-button-stop" 
            onClick={handleStopTracking}
          >
            Stop Tracking
          </button>
        ) : (
          <button 
            className="tracking-button tracking-button-start" 
            onClick={handleStartTracking}
          >
            Start Tracking
          </button>
        )}
      </div>
      <div>
        <GoogleMap
          zoom={14}
          center={positions[positions.length - 1]}
          mapContainerClassName="map-container"
        >
        <PolylineF
          path={positions}
          options={{
            strokeColor: '#0000FF', // red
            strokeOpacity: 1.0,
            strokeWeight: 5,
          }}
        />
          {positions.map((position, index) => (
            <MarkerF key={index} position={position} />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}
