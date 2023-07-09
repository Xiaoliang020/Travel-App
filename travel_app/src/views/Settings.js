import React, { useState } from 'react';
import { useContext } from 'react';
import SavedPathsContext from '../SavedPathsContext';
import { ThemeContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Table, Modal } from 'antd';



export default function Settings() {
    const { savedPaths, setDisplayedPath } = useContext(SavedPathsContext);
    const { theme, setTheme } = useContext(ThemeContext);
    const navigate = useNavigate();


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
            title: 'Path Details',
            dataIndex: 'details',
            key: 'details',
            render: (text, record) => (
                <div>
                    {record.path.map((point, index) => (
                        <p key={index}>Point {index + 1}: {point.lat}, {point.lng}</p>
                    ))}
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <button onClick={() => {
                    setDisplayedPath(record.path);
                    navigate('/map');
                }}>Display on map</button>
            ),
        },
    ];

    // Define the data for the table
    const data = savedPaths.map((path, index) => ({
        key: index + 1,
        path: path,
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