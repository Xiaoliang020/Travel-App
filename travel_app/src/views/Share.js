import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, PolylineF } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const SharedPage = () => {
  const { pathId } = useParams();
  const [path, setPath] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapZoom, setMapZoom] = useState(15);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/share/${pathId}`)
      .then(response => {
        setPath(response.data.data);
        console.log("Successfully retrive shared path:", response.data.data);
      })
      .catch(error => {
        console.error('Error retrieving shared path:', error);
      });
    // get markers binded with the path
    axios.get(`${apiUrl}/api/share/marker/${pathId}`)
      .then(response => {
        console.log(response.data.data);
        setMarkers(response.data.data);
        console.log("Successfully retrive shared markers:", response.data.data);
      })
      .catch(error => {
        console.error('Error retrieving shared markers:', error);
      });
  }, [pathId]);

  // TODO
  const handleMarkerClick = (marker) => {

  };

  if (!path) {
    return <div>Loading...</div>;
  }

  const mapCenter = {
    lat: path.path[0].lat,
    lng: path.path[0].lng,
  };

  const pathArray = path.path;

  if (!isLoaded) return <div>Loading..</div>

  return (
    <div className="map-view">
      <h1>Shared Path Information</h1>
      <p>Path ID: {path.id}</p>
      <p>Start Address: {path.startAddress}</p>
      <p>End Address: {path.endAddress}</p>
      <p>Start Time: {path.startTime}</p>
      <p>End Time: {path.endTime}</p>
      <div className="map-container">
      <GoogleMap
          center={mapCenter}
          zoom={mapZoom}
          mapContainerClassName="map-container"
        >
          <PolylineF
            path={pathArray}
            options={{
              strokeColor: '#5900FF',
              strokeOpacity: 1.0,
              strokeWeight: 5,
            }}
          />

          {markers.map((marker, index) => (
            <MarkerF
              key={marker}
              position={{ lat: marker.markerLat, lng: marker.markerLng }}
              icon={marker.icon}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default SharedPage;
