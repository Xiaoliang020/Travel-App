import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useLoadScript, MarkerF, PolylineF } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import { Modal, Image } from 'antd';
import axios from 'axios';
import '../assets/styles/share.css';
import startMarker from '../picture/flaggreen.svg'
import stopMarker from '../picture/flagred.svg'

const SharedPage = () => {
  const { pathId } = useParams();
  const [path, setPath] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapZoom, setMapZoom] = useState(15);
  const [isMarkersReady, setIsMarkersReady] = useState(false);

  const markerText = useRef("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/user/path/${pathId}`)
      .then(response => {
        setPath(response.data.data);
        console.log("Successfully retrive shared path:", response.data.data);
      })
      .catch(error => {
        console.error('Error retrieving shared path:', error);
      });
    // get markers binded with the path
    axios.get(`${apiUrl}/user/marker/${pathId}`)
      .then(response => {
        console.log(response.data.data);
        const markersData = response.data.data;
        setMarkers(markersData);
        setIsMarkersReady(true);
      })
      .catch(error => {
        console.error('Error retrieving shared markers:', error);
      });
  }, [pathId]);

  function convertToDate(timeArray) {
    // 注意：月份减1，因为JavaScript中月份是从0开始的
    const [year, month, day, hour, minute, second] = timeArray;
    const date = new Date(year, month - 1, day, hour, minute, second);
    return date.toLocaleString();
  }

  // TODO
  const handleMarkerClick = (marker) => {
    console.log("marker text is:" + marker.text);
    markerText.current = marker.text;

    // 打开 Modal
    openModal(marker);
  };

  const MarkerModalContent = ({
    marker,
    pictureDataGroup,
    inputText,
  }) => {
    return (
      <div>
        <div>
          Text: {markerText.current}
        </div>
        <br></br>
        Pictures:
        <div>
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            {pictureDataGroup.map((pictureData, index) => (
              <Image key={index} width={100} src={pictureData} />
            ))}
          </Image.PreviewGroup>
        </div>
      </div>
    );
  }

  const openModal = (marker) => {
    Modal.confirm({
      title: 'The marker you left in this place',
      content: <MarkerModalContent
        key={new Date().getTime()} // 强制更新
        marker={marker}
        pictureDataGroup={marker.picture}
      />,
      onOk: (close) => {
        close()
      },
    });
  };


  if (!path || !isMarkersReady || !isLoaded) {
    return <div>Loading...</div>;
  }

  const mapCenter = {
    lat: path.path[0].lat,
    lng: path.path[0].lng,
  };

  const pathArray = path.path;

  const startPosition = pathArray[0];
  const stopPosition = pathArray[pathArray.length - 1];

  if (!isLoaded) return <div>Loading..</div>

  return (
    <div className="map-view">
      <div className="path-info">
        <h1>Path Name: {path.name}</h1>
        <p>Start Address: {path.startAddress}</p>
        <p>End Address: {path.endAddress}</p>
        <p>Start Time: {convertToDate(path.startTime)}</p>
        <p>End Time: {convertToDate(path.endTime)}</p>
      </div>
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

            {markers.map(marker => (
              <MarkerF
                key={marker.id} // Assuming there's a unique id for each marker
                position={{ lat: marker.markerLat, lng: marker.markerLng }}
                icon={{
                  url: marker.icon,
                  scaledSize: new window.google.maps.Size(40, 40)
                }}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}

            <MarkerF
              position={startPosition}
              icon={{
                url: startMarker,
                scaledSize: new window.google.maps.Size(32, 32), // Adjust the size as needed
                anchor: new window.google.maps.Point(1, 32)
              }}
            />

            <MarkerF
              position={stopPosition}
              icon={{
                url: stopMarker,
                scaledSize: new window.google.maps.Size(32, 32), // Adjust the size as needed
                anchor: new window.google.maps.Point(1, 32)
              }}
            />
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default SharedPage;
