import React from 'react';
import axios from 'axios';

const ExportButton = ({ container }) => {
  const handleExport = async () => {
    if (container.status !== 'stopped') {
      alert('To export Image you need to Stop the container first.');
      return;
    }

    try {
      // Placeholder for actual API endpoint
      const response = await axios.get(`http://192.168.100.146:3230/api/container/export?containerId=${container.Id}`);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${container.Name}.tar`); // Assuming tar format
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      alert('Error exporting container: ' + error.message);
    }
  };

  return <button onClick={handleExport}>Export</button>;
};

export default ExportButton;
