import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useLoadScript, MarkerF, PolylineF } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import { Modal, Image } from 'antd';
import axios from 'axios';
import '../assets/styles/share.css';
import startMarker from '../picture/flaggreen.svg'
import stopMarker from '../picture/flagred.svg'

const ShareMap = ({ pathId }) => {
//   const { pathId } = useParams();
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
        // Promise.all(markersData.map(marker => {
        //   return axios.get(`${apiUrl}/api/icon/${marker.icon}`)
        //     .then(response => {
        //       // ... (existing code to handle marker icon response)
        //       if (response.data.code === '0') {
        //         console.log('Marker data get successfully', response.data);
        //         const imageBase64 = response.data.data;
        //         const imageUrl = `data:image/png;base64,${imageBase64}`;
        //         const customMarkerIcon = {
        //           url: imageUrl,
        //           scaledSize: new window.google.maps.Size(64, 64)
        //         };
        //         marker.url = customMarkerIcon;
        //       }
        //     })
        //     .catch(error => {
        //       console.log('Error getting marker icon from the backend:', error);
        //     });
        // })).then(() => {
        //   setMarkers(markersData);
        //   setIsMarkersReady(true); // Markers and icons are now ready
        // })
        setMarkers(markersData);
        setIsMarkersReady(true);
      })
      .catch(error => {
        console.error('Error retrieving shared markers:', error);
      });
  }, [pathId]);

  // TODO
  const handleMarkerClick = (marker) => {
    console.log("marker text is:" + marker.text);
    markerText.current = marker.text;

    // 预先加载图片数据
    // const promises = marker.picture.map(pictureID => {
    //   return axios.get(`${apiUrl}/api/picture/${pictureID}`)
    //     .then((response) => {
    //       if (response.data.code === '0') {
    //         return response.data.data;
    //       } else {
    //         console.log("Picture not found");
    //         return null;
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching picture data:', error);
    //       return null;
    //     });
    // });

    // 等待所有图片数据加载完成后再打开 Modal
    // Promise.all(promises)
    //   .then((imageBase64Array) => {
    //     // 过滤掉加载失败的图片数据
    //     const filteredImageBase64Array = imageBase64Array.filter(imageBase64 => imageBase64 !== null);
    //     // 打开 Modal
    //     openModal(marker);
    //   });
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
                  scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
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

export default ShareMap;
