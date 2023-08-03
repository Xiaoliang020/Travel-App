import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Card, Row, Col, message, Avatar, Upload } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { ThemeContext } from '../App';
import defaultImage from '../picture/Default.png'
import nightImage from '../picture/Night.png'
import ImgCrop from 'antd-img-crop'
import axios from 'axios';

export default function Settings() {
    const { theme, setTheme } = useContext(ThemeContext);
    const { Meta } = Card;
    // State to store the user's avatarData
    const [userAvatarData, setUserAvatarData] = useState(null);
    // Get the user info stored in sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user"));
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    // Fetch the user's avatarUrl when the component mounts
    useEffect(() => {
        // Make an API call to fetch the user data, including the avatarUrl
        axios.get(`${apiUrl}/api/avatar/${user.id}`)
        .then((response) => {
            if (response.data.code === '0') {
                const imageBase64 = response.data.data;
                // Set the userAvatarUrl state with the fetched avatar data
                setUserAvatarData(`data:image/png;base64,${imageBase64}`);
            } else {
                console.log(response.data.msg);
            }
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
    }, []);

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
            // Save the file URL or file ID returned by the backend
            console.log('Avatar uploaded successfully:', response.data);
            onSuccess();
            window.location.reload();
        } else {
            onError(new Error('Failed to upload avatar'));
        }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            onError(error);
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                {/* Display the user's avatar if available, otherwise show the default user icon */}
                {userAvatarData ? (
                    <Avatar size={100} src={userAvatarData} />
                ) : (
                    <Avatar size={100} icon={<UserOutlined />} />
                )}

                <div style={{ marginTop: 16, marginBottom: 16 }}>
                <ImgCrop
                    rotationSlider={true}
                    zoomSlider={true}
                    quality={1}
                    cropShape='round'
                >
                    <Upload customRequest={customRequest} showUploadList={false} onChange={handleAvatarChange}>
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload>
                </ImgCrop>
                </div>
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