import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF, PolylineF } from '@react-google-maps/api';
import '../App.css';
import { FloatButton, Button, Tooltip } from 'antd';
import { } from 'antd';
import { useContext } from 'react';
import SavedPathsContext from '../SavedPathsContext';
import { ThemeContext } from '../App';
import { PlayCircleOutlined, StopOutlined, CompassOutlined, EyeOutlined, EyeInvisibleOutlined, PlusOutlined, ClearOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';


export default function Map() {
  const [positions, setPositions] = useState([]);
  const [trackingEnabled, setTrackingEnabled] = useState(false); // State to track whether geolocation tracking is enabled
  const [pathId, setPathId] = useState(0);
  // const [clearedPaths, setClearedPaths] = useState([]); // State to store cleared paths, probably needed for future features
  const [currentPosition, setCurrentPositions] = useState({ lat: null, lng: null });
  const [isPathsVisible, setIsPathsVisible] = useState(true);
  const [mapCenter, setMapCenter] = useState(null);
  const [mapZoom, setMapZoom] = useState(14);

  const { addPath, displayedPath, setDisplayedPath } = useContext(SavedPathsContext);
  const { theme } = useContext(ThemeContext);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapId = theme === 'default' ? '17e23ad9dc98cd76' : '965d3fbc319fcf57';

  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);



  function getLocation (){
    return new Promise((resolve,reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  async function getAvgLocation(pathId){

    const { latitude: firstLat, longitude: firstLng } = await getLocation();
    console.log({ firstLat, firstLng });
  
    await new Promise((resolve) => {
      setTimeout(function(){
        resolve();
      }, 1000);
    });

    const { latitude: secondLat, longitude: secondLng } = await getLocation();
    console.log({ secondLat, secondLng });

    await new Promise((resolve) => {
      setTimeout(function(){
        resolve();
      }, 1000);
    });
  
    const { latitude: thirdLat, longitude: thirdLng } = await getLocation();
    console.log({ thirdLat, thirdLng });

    const position = {
      latitude: (firstLat + secondLat + thirdLat)/3.0 , 
      longitude: (firstLng + secondLng + thirdLng)/3.0
    }

    setPositions((prev) => [...prev, { lat: position.latitude, lng: position.longitude, type: "default", pathId }]);
    setCurrentPositions({ lat: position.latitude, lng: position.longitude });

  }


  // Get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Set the default map center to the user's current location
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error retrieving geolocation:", error);
          // If can't get the user's current location, the set to a default location
          setMapCenter({ lat: 40.7128, lng: -74.0060 }); // Anywhere can be changed later
        }
      );
    } else {
      // If the web browser doesn't support geolocation, also set a default center
      setMapCenter({ lat: 40.7128, lng: -74.0060 });
    }
  }, []);

  useEffect(() => {
    if (displayedPath && displayedPath.length > 0) {
      // If there is a path to display, set the center point of the map to the first point of the displayed path
      setMapCenter(displayedPath[0]);
      setMapZoom(15);
    } else if (positions.length > 0) {
      // If there is no path to display, but is under tracking, set the center point of the map as the last tracked point
      setMapCenter(positions[positions.length - 1]);
    }
    // If the geolocation cannot be obtained or there is no path being tracked, keep the center point unchanged
  }, [displayedPath, positions]);

  useEffect(() => {
    let interval;

    if (trackingEnabled) {
      // Immediately get the current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPositions((prev) => [...prev, { lat: latitude, lng: longitude, type: "default", pathId }]);
          setCurrentPositions({ lat: latitude, lng: longitude });
          console.log("Got first location after click the button");
        },
        (error) => {
          console.error('Error retrieving geolocation:', error);
        }
      );

      // Start tracking location every 10 seconds
      interval = setInterval(async () => {
        console.log("Start Marking");
        await getAvgLocation(pathId);
        console.log("Get a location");
        console.log(pathId);


      }, 7000);
    }

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [trackingEnabled, pathId]);

  const handleStartTracking = () => {
    setPositions([]); // clear positions before a new tracking
    setTrackingEnabled(true);
    setPathId(pathId + 1);
    console.log("Start tracking");
  };

  const handleStopTracking = () => {
    setTrackingEnabled(false);
    console.log("Stop tracking");

    if (window.confirm("Do you want to save this path?")) {
      addPath(positions);
    }
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
    setDisplayedPath([]);
  }

  const togglePathsVisibility = () => {
    setIsPathsVisible(!isPathsVisible);
  };

  const handleAddPoint = () => {
    const { lat, lng } = currentPosition;
    const newMarker = {
      lat,
      lng,
      type: "custom",
      id: Date.now(), // Assign a unique ID to the marker
    };

    setPositions((prevPositions) => [...prevPositions, newMarker]);
    console.log("Add an information point");
  };

  const handleScreenshot = async () => {
    setIsTakingScreenshot(true);

    const mapContainer = document.querySelector('.map-container');
  
    html2canvas(mapContainer, { useCORS: true, allowTaint: true}).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'screenshot.png';
      link.click();
  
      setIsTakingScreenshot(false);
    });
  };

  const handleShareScreenshot = async () => {
    setIsTakingScreenshot(true);
  
    const mapContainer = document.querySelector('.map-container');
  
    html2canvas(mapContainer, { useCORS: true, allowTaint: true }).then((canvas) => {
      const blob = canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'screenshot.png', { type: 'image/png' });
  
          if (navigator.share) {
            // Share the screenshot using the Web Share API
            navigator.share({
              files: [file],
            });
          } else {
            console.error('Web Share API not supported.');
          }
        } else {
          console.error('Failed to generate screenshot blob.');
        }
  
        setIsTakingScreenshot(false);
      });
    });
  };
  

  if (!isLoaded) return <div>Loading..</div>

  return (
    <div className="map-view">
      <div className="map-container">
        <GoogleMap
          center={mapCenter}
          zoom={mapZoom}
          mapContainerClassName="map-container"
          // Problem: Cannot show the map's detail in the screenshot when enable mapId
          options={{
            mapId: mapId,
            fullscreenControl: false, // 添加这一行来隐藏全屏控件
            streetViewControl: false,
          }}
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

          {displayedPath && isPathsVisible && ( // Display the saved path
            <PolylineF
              path={displayedPath}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 5,
              }}
            />
          )}

          {positions.map((position, index) => (
            <MarkerF
              key={index}
              position={position}
              icon={position.type === 'custom' ? {
                url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png'
              } : null}
            />
          ))}
        </GoogleMap>

        {/* Main start/stop button */}
        <div className='map-view-start-stop-button'>
          {trackingEnabled ? (
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={handleStopTracking}
              icon={<StopOutlined />}
              style={{ backgroundColor: 'OrangeRed' }}
            >
              STOP
            </Button>
          ) : (
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={handleStartTracking}
              icon={<PlayCircleOutlined />}
              style={{ backgroundColor: 'LimeGreen' }}
            >
              START
            </Button>
          )}
        </div>

        {/* Text location information and back to top button*/}
        <FloatButton.Group shape="circle" style={{ left: 24 }}>
          <Tooltip
            title={
              <div>
                <h1>Your current location:</h1>
                <p>Latitude: {currentPosition.lat} </p>
                <p>Longitude: {currentPosition.lng}</p>
              </div>
            }
            placement='right'
            color='#87d068'
          >
            <FloatButton
              icon={<CompassOutlined />}
            />
          </Tooltip>

          <FloatButton.BackTop visibilityHeight={0} />
        </FloatButton.Group>


        {/* Functional buttons group */}
        <FloatButton.Group shape="circle" style={{ right: 50, top: '60%', transform: 'translateY(-50%)' }}>
          {isPathsVisible ? (
            <FloatButton
              icon={<EyeInvisibleOutlined />}
              tooltip='Hide Paths'
              onClick={togglePathsVisibility}
            />
          ) : (
            <FloatButton
              icon={<EyeOutlined />}
              tooltip='Show Paths'
              onClick={togglePathsVisibility}
            />
          )}

          <FloatButton
            icon={<PlusOutlined />}
            tooltip='Add a Point'
            onClick={handleAddPoint}
            disabled={!trackingEnabled}
          />

          <FloatButton
            icon={<ClearOutlined />}
            tooltip='Clear'
            onClick={handleClearPaths}
            disabled={trackingEnabled}
          />

          <FloatButton
            icon={<DownloadOutlined />}
            tooltip="Take Screenshot"
            onClick={handleScreenshot}
            disabled={isTakingScreenshot}
          />

          <FloatButton
            icon={<ShareAltOutlined />}
            tooltip="Share"
            onClick={handleShareScreenshot}
            disabled={isTakingScreenshot}
          />
        </FloatButton.Group>

      </div>

    </div >
  );
}