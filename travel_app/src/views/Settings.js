import React, { useState, useContext, useEffect } from 'react';
import { Table, Modal, Button, Card, Row, Col, message, Avatar, Upload } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import SavedPathsContext from '../SavedPathsContext';
import { ThemeContext } from '../App';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../picture/Default.png'
import nightImage from '../picture/Night.png'
import axios from 'axios';

export default function Settings() {
    const { savedPaths, setDisplayedPath, deletePath } = useContext(SavedPathsContext);
    const { theme, setTheme } = useContext(ThemeContext);
    // State to store the selected avatar image file
    const [avatarImage, setAvatarImage] = useState(null);
    const navigate = useNavigate();
    const { Meta } = Card;
    // State to store the user's avatarUrl
    const [userAvatarDataUrl, setUserAvatarDataUrl] = useState(null);
    // Get the user info stored in sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user"));
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    // Fetch the user's avatarUrl when the component mounts
    useEffect(() => {
        // Make an API call to fetch the user data, including the avatarUrl
        axios.get(`${apiUrl}/api/avatar/${user.id}`)
        .then((response) => {
            if (response.data.code === '0') {
                console.log(response.data.data);
                // Convert the image data to a base64 URL
                // const imageBase64 = btoa(
                //     new Uint8Array(response.data.data).reduce(
                //       (data, byte) => data + String.fromCharCode(byte),
                //       '',
                //     ),
                //   );
                // console.log(imageBase64);
                const imageBase64 = response.data.data;
                // Set the userAvatarUrl state with the fetched avatar data
                setUserAvatarDataUrl(`data:image/png;base64,${imageBase64}`);
            } else {
                console.log("User not found");
            }
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
    }, []);

    const handleDisplayPath = (path) => {
        setDisplayedPath(path);
        navigate('/map');
    };

    const handleDeletePath = (pathId) => {
        Modal.confirm({
            centered: true,
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this path?',
            onOk: () => {
                deletePath(pathId);
                console.log(`Delete button clicked for path with ID ${pathId}`);
                console.log(`Current number of saved paths is ${savedPaths.length}`);
            },
        });
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        message.success('Theme switched successfully!');
    };

    const handleAvatarChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} upload failed.`);
        }
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        try {
        const formData = new FormData();
        formData.append('file', file);
        // Change the URL to your backend endpoint that handles the avatar upload
        const response = await axios.post(`${apiUrl}/api/${user.id}/upload-avatar`, formData);
        if (response.data.code === '0') {
            // Save the file URL or file ID returned by the backend in your state or user profile
            console.log('Avatar uploaded successfully:', response.data);
            onSuccess();
        } else {
            onError(new Error('Failed to upload avatar'));
        }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            onError(error);
        }
    };

    // Function to save the image data to your computer
    const saveImageToComputer = () => {
    if (userAvatarDataUrl) {
      // Convert the base64 URL to a Blob
      fetch(userAvatarDataUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Create a temporary link to the Blob and trigger the download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'avatar.png'; // Specify the desired filename for the download
          link.click();
        })
        .catch((error) => {
          console.error('Error saving image:', error);
        });
    }
  };

    // Define the columns for the table
    const columns = [
        {
            title: 'Path ID',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Start place & time',
            dataIndex: 'start',
            key: 'start',
            render: (text, record) => (
                <div>
                    <p>Time: {record.startTime.toString()}</p>
                    <p>Place: {record.startAddress}</p>
                </div>
            ),
        },
        {
            title: 'End place & time',
            dataIndex: 'end',
            key: 'end',
            render: (text, record) => (
                <div>
                    <p>Time: {record.endTime.toString()}</p>
                    <p>Place: {record.endAddress}</p>
                </div>
            ),
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (text, record) => (
                <div>{formatDuration(record.duration)}</div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleDisplayPath(record.path)}>Display on map</Button>
                    <Button onClick={() => handleDeletePath(record.key)}>Delete</Button>
                </div>
            ),
        },
    ];

    const formatDuration = (duration) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.round(duration % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Define the data for the table
    const data = savedPaths.map((path, index) => ({
        key: index + 1,
        path: path.path,
        startTime: path.startTime,
        endTime: path.endTime,
        duration: path.duration,
        startAddress: path.startAddress,
        endAddress: path.endAddress,
    }));

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                {/* Display the user's avatar if available, otherwise show the default user icon */}
                {userAvatarDataUrl ? (
                    <Avatar size={100} src={userAvatarDataUrl} />
                ) : (
                    <Avatar size={100} icon={<UserOutlined />} />
                )}

                <div style={{ marginTop: 16, marginBottom: 16 }}>
                    <Upload customRequest={customRequest} showUploadList={false} onChange={handleAvatarChange}>
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload>
                    {/* Button to save the image to your computer */}
                    <Button onClick={saveImageToComputer}>Save Avatar</Button>
                </div>
            </div>
            <div>
                <Card title="Saved Paths">
                    
                    {/* Add the table here */}
                    <Table columns={columns} dataSource={data} />
                </Card>
            </div>

            <div>
                <Card title="Select Theme">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card
                                hoverable
                                style={{ flex: 1 }}
                                cover={<img src={defaultImage} alt="Default Mode" />}
                                onClick={() => handleThemeChange('default')}
                            >
                                <Meta title="Default Mode" />
                            </Card>

                        </Col>
                        <Col span={12}>
                            <Card
                                hoverable
                                style={{ flex: 1 }}
                                cover={<img src={nightImage} alt="Night Mode" />}
                                onClick={() => handleThemeChange('dark')}
                            >
                                <Meta title="Night Mode" />
                            </Card>

                        </Col>
                    </Row>

                </Card>
            </div>
        </div>
    );
}