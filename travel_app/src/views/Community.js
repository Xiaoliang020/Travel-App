import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Community() {
    let userStr = sessionStorage.getItem("user") || "{}"
    let user = JSON.parse(userStr);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    // State to store the user's avatarUrl
    const [userAvatarDataUrl, setUserAvatarDataUrl] = useState(null);

    // Fetch the user's avatarUrl when the component mounts
    useEffect(() => {
        // Make an API call to fetch the user data, including the avatarUrl
        axios.get(`${apiUrl}/api/avatar/${user.id}`)
            .then((response) => {
                if (response.data.code === '0') {
                    console.log(response.data.data);

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

    console.log(user);
    return (
        <div className='community'>
            <header>
                {user && <p>Welcome, {user.username}!</p>}
            </header>
        </div>
    )
}
