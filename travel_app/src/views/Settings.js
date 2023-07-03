import React, { useState } from 'react';
import { useContext } from 'react';
import SavedPathsContext from '../SavedPathsContext';
import { ThemeContext } from '../App';


export default function Settings() {
    const { savedPaths } = useContext(SavedPathsContext);
    const { theme, setTheme } = useContext(ThemeContext);

    const handleThemeChange = (e) => {
        const newTheme = e.target.value;
        setTheme(newTheme);
      };

    return (
        <div>
            <h1>Settings</h1>

            <h2>Saved Paths</h2>
            {savedPaths.map((path, index) => (
                <div key={index}>
                    {/* Replace this with how you want to display the path */}
                    Path {index + 1}: {path[0].lat}, {path[0].lng}
                </div>
            ))}

            <label>Select Theme:</label>
            <select value={theme} onChange={handleThemeChange}>
                <option value="default">Default</option>
                <option value="Night Mode">Dark</option>

                {/* 添加其他主题选项 */}
            </select>
        </div>
    );
}