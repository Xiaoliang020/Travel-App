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
  const [isMarkersReady, setIsMarkersReady] = useState(false);

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
        const markersData = response.data.data;
        Promise.all(markersData.map(marker => {
          return axios.get(`${apiUrl}/api/icon/${marker.icon}`)
            .then(response => {
              // ... (existing code to handle marker icon response)
              if (response.data.code === '0') {
                console.log('Marker data get successfully', response.data);
                const imageBase64 = response.data.data;
                const imageUrl = `data:image/png;base64,${imageBase64}`;
                const customMarkerIcon = {
                  url: imageUrl,
                  scaledSize: new window.google.maps.Size(64, 64)
                };
                marker.url = customMarkerIcon;
              }
            })
            .catch(error => {
              console.log('Error getting marker icon from the backend:', error);
            });
        })).then(() => {
          setMarkers(markersData);
          setIsMarkersReady(true);; // Markers and icons are now ready
        })
      })
      .catch(error => {
        console.error('Error retrieving shared markers:', error);
      });
  }, [pathId]);

  // TODO
  const handleMarkerClick = (marker) => {
    
  };

  if (!path || !isMarkersReady || !isLoaded) {
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
      <h1>Path Name: {path.name}</h1>
      <p>Start Address: {path.startAddress}</p>
      <p>End Address: {path.endAddress}</p>
      <p>Start Time: {path.startTime}</p>
      <p>End Time: {path.endTime}</p>
      <div className="map-container">
        {isMarkersReady && isLoaded && ( // Check if markers are ready and Google Map is loaded
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
                key={marker.id} // Assuming there's a unique id for each marker
                position={{ lat: marker.markerLat, lng: marker.markerLng }}
                icon={marker.url}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default SharedPage;
