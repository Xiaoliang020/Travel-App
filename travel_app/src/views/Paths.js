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

    const getCurrentWebsiteURL = () => {
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port = window.location.port;
        const path = window.location.pathname;

        // If the port is empty or equal to 80 (HTTP) or 443 (HTTPS), don't include it in the URL
        const portSuffix = (port && port !== '80' && port !== '443') ? `:${port}` : '';

        // Assemble the website URL
        const websiteURL = `${protocol}//${hostname}${portSuffix}`;

        return websiteURL;
    };

    const handleSharePath = (pathId) => {
        // axios.get(`/api/share/${pathId}`)
        // .then((response) => {
        //     // Get the shareable link from the response and show it to the user
        //     const currentURL = getCurrentWebsiteURL();
        //     console.log(currentURL);
        //     message.success('Shareable link: ' + currentURL + `/share/${pathId}`);
        // })
        // .catch((error) => {
        //     console.error('Error generating shareable link:', error);
        //     message.error('Error generating shareable link');
        // });
        // Get the shareable link from the response and show it to the user
        const currentURL = getCurrentWebsiteURL();
        console.log(currentURL);
        message.success('Shareable link: ' + currentURL + `/share/${pathId}`);
    }

    // Define the columns for the table
    const columns = [
        {
            title: 'Path Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Start place & time',
            dataIndex: 'start',
            key: 'start',
            render: (text, record) => (
                <div>
                    <p>Time: {new Date(record.startTime).toLocaleString()}</p>
                    <p>Place: {record.startAddress}</p>
                </div>
            ),
            sorter: (a, b) => new Date(a.startTime) - new Date(b.startTime)
        },
        {
            title: 'End place & time',
            dataIndex: 'end',
            key: 'end',
            render: (text, record) => (
                <div>
                    <p>Time: {new Date(record.endTime).toLocaleString()}</p>
                    <p>Place: {record.endAddress}</p>
                </div>
            ),
            sorter: (a, b) => new Date(a.endTime) - new Date(b.endTime)
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (text, record) => (
                <div>{formatDuration(record.duration)}</div>
            ),
            sorter: (a, b) => a.duration - b.duration
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
        name: path.name,
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
    );
}