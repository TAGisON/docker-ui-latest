import React, { useState } from 'react';
import axios from 'axios';
import FullScreenLoader from '../../components/FullScreenLoader'; 

const ExportButton = ({ containerStatus, containerId, containerName }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (containerStatus === 'running') {
      alert('To export the image, you need to stop the container first.');
      return;
    }

    setLoading(true); // Show loader

    try {
      const response = await axios.get(`http://192.168.100.146:3230/api/container/export`, {
        params: {
          containerId,
          containerName
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${containerName}.tar`); // Assuming tar format
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      alert('Error exporting container: ' + error.message);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      <button onClick={handleExport}>Export</button>
      {loading && <FullScreenLoader />}
    </>
  );
};

export default ExportButton;
