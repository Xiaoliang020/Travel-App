import React, { useState, useContext } from 'react';
import { Table, Modal } from 'antd';
import SavedPathsContext from '../SavedPathsContext';
import { ThemeContext } from '../App';
import { useNavigate } from 'react-router-dom';


export default function Settings() {
    const { savedPaths, setDisplayedPath } = useContext(SavedPathsContext);
    const { theme, setTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleDisplayPath = (path) => {
        setDisplayedPath(path);
        navigate('/map');
    };

    const handleThemeChange = (e) => {
        const newTheme = e.target.value;
        setTheme(newTheme);
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
                    <p>开始时间: {record.startTime.toString()}</p>
                    <p>开始地点: {record.startAddress}</p>
                </div>
            ),
        },
        {
            title: 'End place & time',
            dataIndex: 'end',
            key: 'end',
            render: (text, record) => (
                <div>
                    <p>结束时间: {record.endTime.toString()}</p>
                    <p>结束地点: {record.endAddress}</p>
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
                <button onClick={() => handleDisplayPath(record.path)}>Display on map</button>
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
            <h2>Saved Paths</h2>

            {/* Add the table here */}
            <Table columns={columns} dataSource={data} />


            <label>Select Theme:</label>
            <select value={theme} onChange={handleThemeChange}>
                <option value="default">Default</option>
                <option value="Night Mode">Dark</option>

                {/* 添加其他主题选项 */}
            </select>
        </div>
    );
}