import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF, PolylineF } from '@react-google-maps/api';
import '../App.css';

export default function Map() {
  const [positions, setPositions] = useState([]);
  const [trackingEnabled, setTrackingEnabled] = useState(false); // State to track whether geolocation tracking is enabled
  const [pathId, setPathId] = useState(0);
  // const [clearedPaths, setClearedPaths] = useState([]); // State to store cleared paths, probably needed for future features
  const [currentPosition, setCurrentPositions] = useState({ lat: null, lng: null });
  const [isPathsVisible, setIsPathsVisible] = useState(true);


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
          setPositions((prev) => [...prev, { lat: latitude, lng: longitude, pathId }]);
          setCurrentPositions({ lat: latitude, lng: longitude });
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
            setPositions((prev) => [...prev, { lat: latitude, lng: longitude, pathId }]);
            setCurrentPositions({ lat: latitude, lng: longitude });
            console.log("Get a location");
            console.log(pathId);
          },
          (error) => {
            console.error('Error retrieving geolocation:', error);
          }
        );
      }, 10000);
    }

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [trackingEnabled, pathId]);

  const handleStartTracking = () => {
    setTrackingEnabled(true);
    setPathId(pathId + 1);
    console.log("Start tracking");
  };

  const handleStopTracking = () => {
    setTrackingEnabled(false);
    console.log("Stop tracking");
  };

  // Group positions by pathId
  const positionByPathId = positions.reduce((acc, position) => {
    (acc[position.pathId] = acc[position.pathId] || []).push(position);
    return acc;
  }, {});

  const handleClearPaths = () => {
    // setClearedPaths(positions);
    setPositions([]);
    setPathId(0);
  }

  const togglePathsVisibility = () => {
    setIsPathsVisible(!isPathsVisible);
  };


  if (!isLoaded) return <div>Loading..</div>

  return (
    <div className="map-view">
      <h1>Location Information</h1>

      <div>
        <p>Latitude: {currentPosition.lat}</p>
        <p>Longitude: {currentPosition.lng}</p>
      </div>

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
        <button
          className="visibility-button"
          onClick={togglePathsVisibility}
        >
          {isPathsVisible ? 'Hide Paths' : 'Show Paths'}
        </button>
      </div>
      <div>
        <button
          className="clear-button"
          onClick={handleClearPaths}
          disabled={trackingEnabled}
        >
          Clear
        </button>
      </div>
      <div>
        <GoogleMap
          zoom={14}
          center={positions[positions.length - 1]}
          mapContainerClassName="map-container"
        >
          {isPathsVisible && Object.values(positionByPathId).map((pathPositions, index) => (
            <PolylineF
              key={index}
              path={pathPositions}
              options={{
                strokeColor: '#0000FF',
                // strokeColor: parseInt(pathId) % 2 === 0 ? '#0000FF' : '#00FF00',
                strokeOpacity: 1.0,
                strokeWeight: 5,
              }}
            />
          ))}
          {positions.map((position, index) => (
            <MarkerF
              key={index}
              position={position}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}
