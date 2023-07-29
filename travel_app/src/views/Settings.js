import React, { useState, useContext } from 'react';
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
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

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
        const response = await axios.post(`${apiUrl}/api/upload-avatar`, formData);
        if (response.data) {
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
                <Avatar size={100} src={avatarImage} icon={<UserOutlined  />} />

                <div style={{ marginTop: 16, marginBottom: 16 }}>
                    <Upload customRequest={customRequest} showUploadList={false} onChange={handleAvatarChange}>
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload>
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