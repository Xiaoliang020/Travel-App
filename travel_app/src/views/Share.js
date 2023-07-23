import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const SharedPage = () => {
  const { pathId } = useParams();
  console.log(pathId);
  const [path, setPath] = useState(null);

  useEffect(() => {
    axios.get(`/api/share/${pathId}`)
      .then(response => {
        setPath(response.data.data);
        console.log("Successfully retrive shared path:", response.data.data);
      })
      .catch(error => {
        console.error('Error retrieving shared path:', error);
      });
  }, [pathId]);

  if (!path) {
    return <div>Loading...</div>;
  }

  return (
    <div className="map-view">
      <h1>Shared Path Information</h1>
      <p>Path ID: {path.id}</p>
      <p>Start Address: {path.startAddress}</p>
      <p>End Address: {path.endAddress}</p>
      <p>Start Time: {path.startTime}</p>
      <p>End Time: {path.endTime}</p>
      <div>
        <h2>Path Array:</h2>
        <pre>{JSON.stringify(path.path, null, 1)}</pre>
      </div>
    </div>
  );
};

export default SharedPage;
