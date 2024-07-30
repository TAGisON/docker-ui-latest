import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const DeployButton = ({ imageName }) => {
  const [loading, setLoading] = useState(false);

  const handleDeploy = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.100.146:3230/api/image/deploy', { imageName });
      if (response.status === 200) {
        alert('Image deployed successfully');
      } else {
        alert('Failed to deploy the image');
      }
    } catch (error) {
      alert('Error deploying the image: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton onClick={handleDeploy} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : <CloudUploadIcon color="primary" />}
    </IconButton>
  );
};

export default DeployButton;
