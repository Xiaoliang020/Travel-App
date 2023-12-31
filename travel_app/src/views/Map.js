import { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, MarkerF, PolylineF } from '@react-google-maps/api';
import '../App.css';
import { FloatButton, Button, Tooltip, Modal, Upload, Input, message, Image } from 'antd';
import { useContext } from 'react';
import SavedPathsContext from '../SavedPathsContext';
import { ThemeContext } from '../App';
import { PlayCircleOutlined, StopOutlined, CompassOutlined, EyeOutlined, EyeInvisibleOutlined, PlusOutlined, ClearOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import Geocode from "react-geocode";
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import ImgCrop from 'antd-img-crop'
import TextArea from 'antd/es/input/TextArea';
import { darkMode } from './mapStyles';
import startMarker from '../picture/flaggreen.svg'
import stopMarker from '../picture/flagred.svg'

export default function Map() {
  const [positions, setPositions] = useState([]);
  const [trackingEnabled, setTrackingEnabled] = useState(false); // State to track whether geolocation tracking is enabled
  const [pathId, setPathId] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPositions] = useState({ lat: null, lng: null });
  const [isPathsVisible, setIsPathsVisible] = useState(true);
  const [mapCenter, setMapCenter] = useState(null);
  const [mapZoom, setMapZoom] = useState(14);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [markerName, setMarkerName] = useState(1);
  const [stopPosition, setStopPosition] = useState(null);
  const [startPositionSet, setStartPositionSet] = useState(false);
  const [flagVisible, setFlagVisible] = useState(true);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const savedPathId = useRef("");
  const pathName = useRef("");
  const inputText = useRef("");
  const markerIcon = useRef("");
  const [pictureGroup, setPictureGroup] = useState([]);
  const pictureGroupRef = useRef([]);
  const [pictureDataGroup, setPictureDataGroup] = useState([]);


  // State to store the user's avatarUrl
  const markerIconDataUrl = useRef("");

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const { addPath, displayedPath, setDisplayedPath } = useContext(SavedPathsContext);
  const { theme } = useContext(ThemeContext);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      // Change the URL to your backend endpoint that handles the icon upload
      const response = await axios.post(`${apiUrl}/api/upload-icon`, formData);
      if (response.data.code === '0') {
        // Save the file URL or file ID returned by the backend in your state or user profile
        console.log('Icon uploaded successfully:', response.data);
        console.log(response.data.data)
        markerIcon.current = response.data.data; // icon's objectID
        console.log(markerIcon.current)
        onSuccess();
      } else {
        onError(new Error('Failed to upload icon'));
      }
    } catch (error) {
      console.error('Error uploading icon:', error);
      onError(error);
    }
  };

  // 监听每一个marker的图片数组
  useEffect(() => {
    console.log(pictureGroup);

  }, [pictureGroup]);

  const customPictureRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      // Change the URL to your backend endpoint that handles the picture upload
      const response = await axios.post(`${apiUrl}/api/upload-picture`, formData);
      if (response.data.code === '0') {
        // Save the file URL or file ID returned by the backend in your state or user profile
        console.log('Picture uploaded successfully:', response.data);
        console.log(response.data.data);
        const pictureObjectID = response.data.data; // picture's objectID
        setPictureGroup((prev) => {
          const newPictureGroup = [...prev, pictureObjectID];
          pictureGroupRef.current = newPictureGroup; // 更新引用
          return newPictureGroup;
        });

        onSuccess();
      } else {
        onError(new Error('Failed to upload picture'));
      }
    } catch (error) {
      console.error('Error uploading picture:', error);
      onError(error);
    }
  };

  const customPictureRequestForClickedMarker = async ({ file, onSuccess, onError, marker }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${apiUrl}/api/upload-picture`, formData);
      if (response.data.code === '0') {
        console.log('Picture uploaded successfully:', response.data);
        const pictureObjectID = response.data.data; // picture's objectID
        // Add the objectID to the marker's picture array
        marker.picture = [...marker.picture, pictureObjectID];

        // Then update the marker in the markers array
        setMarkers(markers.map(m => m === marker ? marker : m));

        // Then update the marker in the database
        await axios.post(`${apiUrl}/api/update-marker`, marker);

        onSuccess();
      } else {
        onError(new Error('Failed to upload picture'));
      }
    } catch (error) {
      console.error('Error uploading picture:', error);
      onError(error);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);


  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  const handleChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload failed.`);
    }
  };


  function getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    });
  }


  async function getAvgLocation(pathId) {

    await new Promise((resolve) => {
      setTimeout(function () {
        resolve();
      }, 1000);
    });

    const { latitude: firstLat, longitude: firstLng } = await getLocation();
    console.log({ firstLat, firstLng });

    await new Promise((resolve) => {
      setTimeout(function () {
        resolve();
      }, 1000);
    });

    const { latitude: secondLat, longitude: secondLng } = await getLocation();
    console.log({ secondLat, secondLng });

    await new Promise((resolve) => {
      setTimeout(function () {
        resolve();
      }, 1000);
    });

    const { latitude: thirdLat, longitude: thirdLng } = await getLocation();
    console.log({ thirdLat, thirdLng });

    const position = {
      latitude: (firstLat + secondLat + thirdLat) / 3.0,
      longitude: (firstLng + secondLng + thirdLng) / 3.0
    }

    setPositions((prev) => [...prev, { lat: position.latitude, lng: position.longitude, type: "default", pathId }]);
    setCurrentPositions({ lat: position.latitude, lng: position.longitude });

    console.log(position);
    setEndTime(new Date()); // Save the end time
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
      setStartTime(new Date()); // Save the start time
      // Immediately get the current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPositions((prev) => [...prev, { lat: latitude, lng: longitude, type: "default", pathId }]);
          setCurrentPositions({ lat: latitude, lng: longitude });
          console.log("Got first location after click the button");
          if (!startPositionSet) {
            setStartPositionSet(true);
          }
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

      }, 8000);
    }

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [trackingEnabled, pathId]);

  const handleStartTracking = () => {
    setPositions([]); // clear positions before a new tracking
    setStopPosition(null);
    setStartPositionSet(false);
    setMarkers([]);
    setTrackingEnabled(true);
    setPathId(prevPathId => prevPathId + 1); // 使用回调函数更新 pathId
    console.log("Start tracking");
  };


  //TODO
  const handleAddPoint = () => {
    const { lat, lng } = currentPosition;

    Modal.confirm({
      title: 'Set a New Marker',
      content: (
        <div>
          Choose an unique icon:
          <ImgCrop
            rotationSlider={true}
            zoomSlider={true}
            quality={1}
            cropShape='round'
          >

            <Upload
              customRequest={customRequest}
              listType="picture-circle"
              onPreview={handlePreview}
              onChange={handleChange}

            >
              {uploadButton}

            </Upload>

          </ImgCrop>

          Type something at this moment:

          <TextArea
            showCount
            maxLength={200}
            style={{ heght: 250, marginBottom: 24 }}
            placeholder="It is memorable that ..."
            onChange={(e) => inputText.current = e.target.value}
          />

          Pictures:
          <ImgCrop>
            <Upload
              listType="picture-card"
              customRequest={customPictureRequest}
              onPreiew={handlePreview}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </ImgCrop>

        </div>
      ),
      onOk: (close) => {
        axios.get(`${apiUrl}/api/icon/${markerIcon.current}`)
          .then((response) => {
            if (response.data.code === '0') {
              console.log(response.data.data);
              const imageBase64 = response.data.data;
              // Set the userAvatarUrl state with the fetched avatar data
              markerIconDataUrl.current = `data:image/png;base64,${imageBase64}`;
              console.log(markerIconDataUrl.current)

              const customMarkerIcon = {
                url: markerIconDataUrl.current, // your base64 data url
                scaledSize: new google.maps.Size(64, 64) // the size you want to scale to
              };


              console.log("现在" + pictureGroupRef.current)
              const newMarker = {
                markerLat: lat,
                markerLng: lng,
                type: "custom",
                markerID: Date.now(), // Assign a unique ID to the marker
                name: markerName,
                text: inputText.current,
                url: customMarkerIcon, // Only for display, will not stored in database
                icon: markerIcon.current,
                pathID: "",
                picture: pictureGroupRef.current
              };

              console.log(newMarker);

              setMarkers((prev) => [...prev, newMarker]);
              setMarkerName(markerName + 1);
              console.log("Add an information point");

            } else {
              console.log("Icon not found");
            }
          })
          .catch((error) => {
            console.error('Error fetching icon data:', error);
          });


        close();
      },
    });

    // 清空图片集
    setPictureGroup([]);
    pictureGroupRef.current = [];
  };

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  const handleStopTracking = () => {
    setTrackingEnabled(false);
    setStopPosition(currentPosition);
    console.log("Stop tracking");

    const duration = (endTime - startTime) / 1000; // Calculate the duration in seconds
    if (duration < 10) {
      setStopPosition(null);
      Modal.warning({
        centered: true,
        title: 'Warning',
        content: 'The path is less than 10 seconds long and will not be saved.',
      });
      return;
    }

    Modal.confirm({
      centered: true,
      title: 'Do you want to save this path?',
      content: (
        <div>
          <p>Enter a name for the path:</p>
          <Input
            onChange={(e) => {
              pathName.current = e.target.value;
            }}
            placeholder="Path name"
          />
        </div>
      ),
      onOk: () => {
        console.log(pathName);
        const startCoordinates = positions[0];
        const endCoordinates = positions[positions.length - 1];
        // Get the user info stored in sessionStorage
        const user = JSON.parse(sessionStorage.getItem("user"));

        // 使用逆地理编码服务获取开始点的地址
        Geocode.fromLatLng(startCoordinates.lat, startCoordinates.lng)
          .then((response) => {
            const startAddress = response.results[0].formatted_address;

            // 使用逆地理编码服务获取结束点的地址
            Geocode.fromLatLng(endCoordinates.lat, endCoordinates.lng)
              .then((response) => {
                const endAddress = response.results[0].formatted_address;

                const pathData = {
                  path: positions,
                  startTime: startTime,
                  endTime: endTime,
                  duration: duration,
                  startAddress: startAddress,
                  endAddress: endAddress,
                  userid: user.id,
                  name: pathName.current,
                };

                console.log("PathData", pathData);

                //send pathData to back end
                axios.post(`${apiUrl}/api/path-data`, pathData)
                  .then(response => {
                    // Check the response code
                    if (response.data.code === '0') {
                      console.log('Path data successfully sent to the backend:', response.data);
                    }
                    // Get pathId from back end
                    console.log("path ID is: " + response.data.data);
                    savedPathId.current = response.data.data;

                    const updatedMarkers = markers.map(item => ({ ...item, pathID: response.data.data }))

                    // send markerData to back end
                    updatedMarkers.forEach(marker => {
                      console.log(marker)
                      axios.post(`${apiUrl}/api/marker-data`, marker)
                        .then(response => {
                          if (response.data.code === '0') {
                            console.log('Marker data successfully sent to backend:', response.data);
                          }
                        })
                        .catch(error => {
                          console.log('Error sending marker data to the backend:', error);
                        });
                    })


                    // Generate the screenshot
                    const mapContainer = document.querySelector('.map-container');
                    const screenshotBlob = html2canvas(mapContainer, {
                      useCORS: true,
                      allowTaint: true,
                    }).then((canvas) => {
                      // Convert the canvas to a blob
                      canvas.toBlob((blob) => {
                        // Create a File object from the blob
                        const screenshotFile = new File([blob], 'screenshot.png', { type: 'image/png' });

                        // Continue with your code to upload the screenshot
                        const formData = new FormData();
                        formData.append('screenshot', screenshotFile);

                        axios.post(`${apiUrl}/api/${savedPathId.current}/upload-screenshot`, formData)
                          .then(response => {
                            if (response.data.code === '0') {
                              console.log('Screenshot uploaded successfully:', response.data);
                            } else {
                              console.log('Screenshot uploaded failed:');
                            }
                          })
                          .catch(error => {
                            console.error('Error uploading Screenshot:', error);
                          });
                      }, 'image/png');
                    });

                  })
                  .catch(error => {
                    console.error('Error sending path data to the backend:', error);
                  });
                //save pathData at front end
                addPath(pathData);
              })
              .catch((error) => {
                console.error("Error geocoding end coordinates:", error);
              });
          })
          .catch((error) => {
            console.error("Error geocoding start coordinates:", error);
          });
      },
      // No action on cancel, as we just close the modal
    });
  };


  // TODO
  const handleMarkerClick = (marker) => {
    console.log("marker text is:" + marker.text);

    // 预先加载图片数据
    const promises = marker.picture.map(pictureID => {
      return axios.get(`${apiUrl}/api/picture/${pictureID}`)
        .then((response) => {
          if (response.data.code === '0') {
            return response.data.data;
          } else {
            console.log("Picture not found");
            return null;
          }
        })
        .catch((error) => {
          console.error('Error fetching picture data:', error);
          return null;
        });
    });

    // 等待所有图片数据加载完成后再打开 Modal
    Promise.all(promises)
      .then((imageBase64Array) => {
        // 过滤掉加载失败的图片数据
        const filteredImageBase64Array = imageBase64Array.filter(imageBase64 => imageBase64 !== null);
        setPictureDataGroup(filteredImageBase64Array);
        // 打开 Modal
        openModal(marker, filteredImageBase64Array);
      });
  };


  const MarkerModalContent = ({
    marker,
    pictureDataGroup,
    trackingEnabled,
    onSaveText, }) => {
    const [localText, setLocalText] = useState(marker.text); // 使用局部状态保存文本
    return (
      <div>
        {trackingEnabled ?
          (<div>
            Comment:
            <br></br>
            {marker.text}
          </div>
          ) :
          (
            <div>
              Do you want to add something new?
              <TextArea
                showCount
                maxLength={200}
                style={{ height: 250, marginBottom: 24 }}
                placeholder="Input something..."
                value={localText} // 使用局部状态作为文本区的值
                onChange={(e) => {
                  setLocalText(e.target.value);
                  onSaveText && onSaveText(e.target.value); // 当文本改变时调用onSaveText
                }}
              // defaultValue={marker.text}
              // onChange={(e) => inputText.current = e.target.value}
              />
            </div>
          )}
        <br></br>
        Pictures:
        <div>
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            {pictureDataGroup.map((pictureData, index) => (
              <Image key={index} width={100} src={`data:image/png;base64,${pictureData}`} />
            ))}
          </Image.PreviewGroup>
        </div>

        {!trackingEnabled &&
          <ImgCrop>
            <Upload
              customRequest={(params) => customPictureRequestForClickedMarker({ ...params, marker })}
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </ImgCrop>
        }
      </div>
    );
  }

  const openModal = (marker, imageBase64Array) => {
    let newText = marker.text; // 用来保存模态框中更改的文本
    Modal.confirm({
      title: 'The marker you left in this place',
      content: <MarkerModalContent
        key={new Date().getTime()} // 强制更新
        marker={marker}
        pictureDataGroup={imageBase64Array}
        // inputText={marker.text}
        onSaveText={(text) => newText = text} // 将文本保存到newText变量中
        trackingEnabled={trackingEnabled} // 确保您传递了trackingEnabled
      // ... 其他props ...
      />,
      onOk: (close) => {
        if (trackingEnabled) {
          close();
          return; // 如果在路径记录状态，直接返回，不执行后续代码
        }
        const updatedMarker = {
          ...marker, // 获取原始marker的所有属性
          text: newText // 更新 text 属性
          //TODO
        };

        // 更新数据库
        axios.post(`${apiUrl}/api/update-marker`, updatedMarker)
          .then(response => {
            if (response.data.code === '0') {
              console.log("Marker updated successfully in database");

              // 更新前端的 state
              setMarkers(markers.map(m => m.markerID === marker.markerID ? updatedMarker : m));
            } else {
              console.log("Error updating marker in database:", response.data.message);
            }
            close();
          })
          .catch(error => {
            console.error("Error sending request to update marker:", error);
            close();
          });
      },
    });
  };



  // Group positions by pathId
  const positionByPathId = positions.reduce((acc, position) => {
    (acc[position.pathId] = acc[position.pathId] || []).push(position);
    return acc;
  }, {});

  const handleClearPaths = () => {
    // setClearedPaths(positions);
    setPositions([]);
    setMarkers([]);
    setMarkerName(1);
    setStartPositionSet(false);
    setStopPosition();
    setPathId(0);
    setDisplayedPath([]);
  }

  const togglePathsVisibility = () => {
    setIsPathsVisible(!isPathsVisible);
    setFlagVisible(!flagVisible);
  };



  const handleScreenshot = async () => {
    setIsTakingScreenshot(true);

    const mapContainer = document.querySelector('.map-container');

    html2canvas(mapContainer, { useCORS: true, allowTaint: true }).then((canvas) => {
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
    /*global google*/
    <div className="map-view">
      <div className="map-container">
        <GoogleMap
          center={mapCenter}
          zoom={mapZoom}
          mapContainerClassName="map-container"
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            ...theme === 'default' ? {} : darkMode,
          }}
        >
          {isPathsVisible && Object.values(positionByPathId).map((pathPositions, index) => (
            <PolylineF
              key={index}
              path={pathPositions}
              options={{
                strokeColor: '#0000FF',
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

          {markers.map(marker => (
            <MarkerF
              key={marker.markerID}
              position={{ lat: marker.markerLat, lng: marker.markerLng }}
              visible={marker.type === 'custom'}
              icon={marker.url}

              onClick={() => handleMarkerClick(marker)}
            />
          ))}

          {flagVisible && startPositionSet && (
            <MarkerF
              position={positions[0]}
              icon={{
                url: startMarker,
                scaledSize: new window.google.maps.Size(32, 32), // Adjust the size as needed
                anchor: new window.google.maps.Point(1,32)
              }}
            />
          )}

          {flagVisible && stopPosition && (
            <MarkerF
              position={stopPosition}
              icon={{
                url: stopMarker,
                scaledSize: new window.google.maps.Size(32, 32), // Adjust the size as needed
                anchor: new window.google.maps.Point(1,32)
              }}
            />
          )}
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