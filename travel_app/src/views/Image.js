import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Image() {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const { imageId } = useParams();
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        console.log(imageId);
        // Make an API call to your backend to fetch the image URL based on the imageId
        // For example, you can use axios to make the API call
        axios
            .get(`${apiUrl}/img/${imageId}`)
            .then((response) => {
                console.log(response.data);
                // Assuming the response.data contains the image URL
                setImageUrl(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching image:', error);
            });
    }, [apiUrl, imageId]);

    if (!imageUrl) {
        // Render a placeholder or loading state while the image is being fetched
        return <div>Loading...</div>;
    }

    return <img src={`data:image/png;base64,${imageUrl}`} alt="User Avatar" />;
}

export default Image;
