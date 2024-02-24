import React, { useEffect, useState, useContext } from 'react';
import { Table, Modal, Button, Card, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Paths() {
    const [paths, setPaths] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // 默认的每页大小
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    // Get the user info stored in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const queryParams = `?userId=${user.id}&page=${currentPage}&pageSize=${pageSize}`;

        axios.get(`${apiUrl}/user/path/page${queryParams}`)
            .then(response => {
                console.log(response.data);
                setTotal(response.data.data.total);
                setPaths(response.data.data.records);
            })
            .catch(error => {
                console.error('Error retrieving paths:', error);
            });
    }, [currentPage, pageSize]);

    function convertToDate(timeArray) {
        // 注意：月份减1，因为JavaScript中月份是从0开始的
        const [year, month, day, hour, minute, second] = timeArray;
        return new Date(year, month - 1, day, hour, minute, second);
    }

    const handleDisplayPath = (pathId) => {
        window.open(`/share/${pathId}`);
    };

    const handleDeletePath = (pathId) => {
        Modal.confirm({
            centered: true,
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this path?',
            onOk: () => {
                console.log(pathId);
                axios.delete(`${apiUrl}/user/path?pathId=${pathId}`)
                    .then((response) => {
                        // Check the response code
                        if (response.data.code === 1) {
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
        const currentURL = getCurrentWebsiteURL();
        console.log(currentURL);

        // Concatenate the URL with the pathId to create the shareable link
        const shareableLink = currentURL + `/share/${pathId}`;

        // Use the Clipboard API to copy the shareable link to the clipboard
        navigator.clipboard.writeText(shareableLink)
            .then(() => {
                // Show a success message to the user
                message.success('Shareable link copied to clipboard! ' + shareableLink);
            })
            .catch((error) => {
                // In case copying to clipboard fails, handle the error here
                console.error('Failed to copy link to clipboard:', error);

                // Show an error message to the user
                message.error('Failed to copy link to clipboard. Please try again.');
            });
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
                    <Button onClick={() => handleDisplayPath(record.id)}>Display on map</Button>
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
        startTime: convertToDate(path.startTime),
        endTime: convertToDate(path.endTime),
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
                    <Table 
                        columns={columns} 
                        dataSource={data}
                        pagination={{
                            current: currentPage,
                            pageSize: pageSize,
                            total: total, // 后端返回的总条目数
                            onChange: (page, pageSize) => {
                                setCurrentPage(page);
                                setPageSize(pageSize);
                            },
                        }}
                    />
                </Card>
            </div>
        </div>
    );
}