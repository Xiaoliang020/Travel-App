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
    // Get the user info stored in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    // Fetch the user's avatarUrl when the component mounts
    useEffect(() => {
        setUserAvatarData(user.avatar);
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

    const updateAvatar = async (avatar) => {
        try {
            // 这里替换成后端处理头像更新的API
            const user = JSON.parse(localStorage.getItem('user'));
            const id = user.id; // 假设用户信息中包含id
            
            // 构造一个UserDTO对象
            const userDTO = {
                id: user.id, // 假设localStorage中保存的用户信息有id
                avatar: avatar
            };

            const response = await axios.put(`${apiUrl}/user`, userDTO);
            if (response.data.code === 1) {
                console.log('Avatar updated in database successfully:', response.data);
            } else {
                console.error('Failed to update avatar in database:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating avatar in database:', error);
        }
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        try {
        const formData = new FormData();
        formData.append('file', file);
        // Change the URL to your backend endpoint that handles the avatar upload
        const response = await axios.post(`${apiUrl}/user/common/upload`, formData);
        if (response.data.code === 1) {
            // Save the file URL or file ID returned by the backend
            console.log('Avatar uploaded successfully:', response.data);
            const avatarUrl = response.data.data

            // 更新localStorage
            user.avatar = avatarUrl;
            localStorage.setItem('user', JSON.stringify(user));

            // 发送给后端更新数据库
            await updateAvatar(avatarUrl);

            onSuccess();
            // window.location.reload();
            setUserAvatarData(avatarUrl);
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