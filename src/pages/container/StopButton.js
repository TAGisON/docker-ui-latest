// src/pages/Container/StopButton/StopButton.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

const StopButton = ({ containerId }) => {
  const [loading, setLoading] = useState(false);

  const handleStop = async () => {
    setLoading(true);
    try {
      await axios.get(`http://127.0.0.1:3230/api/container/command?container=${containerId}&command=stop`);
      alert('Container stopped successfully');
    } catch (error) {
      console.error('Error stopping container:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleStop} disabled={loading}>
      {loading ? 'Stopping...' : 'Stop'}
    </Button>
  );
};

export default StopButton;
