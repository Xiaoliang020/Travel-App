import React, { useEffect, useState, useContext } from 'react';
import { Table, Modal, Button, Card, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import SavedPathsContext from '../SavedPathsContext';
import axios from 'axios';

export default function Paths() {
    const { savedPaths, setDisplayedPath, deletePath } = useContext(SavedPathsContext);

    const [paths, setPaths] = useState([]);
    const navigate = useNavigate();
    // Get the user info stored in sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        axios.get(`/api/paths/${user.id}`)
          .then(response => {
            console.log(response.data);
            setPaths(response.data.data);
          })
          .catch(error => {
            console.error('Error retrieving paths:', error);
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
                console.log(pathId);
                const data = { pathId }; // Wrap pathId in an object
                axios.post(`/api/paths-delete`, data)
                    .then((response) => {
                        // Check the response code
                        if (response.data.code === '0') {
                            // Delete successful
                            console.log('Delete successful!', response.data);
                            message.success('Delete success!');
                            window.location.reload();
                        } else if (response.data.code === '-1') {
                            // Delete failed
                            console.error('Delete failed:', response.data.msg);
                        }
                    })
            },
        });
    };

    const handleSharePath = (pathId) => {
        
    }

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
                    <Button onClick={() => handleDeletePath(record.id)}>Delete</Button>
                    <Button onClick={() => handleSharePath(record.id)}>Share</Button>
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
    const data = paths.map((path, index) => ({
        key: index + 1,
        id: path.id,
        path: path.path,
        startTime: path.startTime,
        endTime: path.endTime,
        duration: path.duration,
        startAddress: path.startAddress,
        endAddress: path.endAddress,
    }));

    return (
        <div>
            <div>
                <Card title="Saved Paths">
                    
                    {/* Add the table here */}
                    <Table columns={columns} dataSource={data} />
                </Card>
            </div>
        </div>
    )
}