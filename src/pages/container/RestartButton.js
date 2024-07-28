// src/pages/Container/RestartButton/RestartButton.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

const RestartButton = ({ containerId }) => {
  const [loading, setLoading] = useState(false);

  const handleRestart = async () => {
    setLoading(true);
    try {
      await axios.get(`http://127.0.0.1:3230/api/container/command?container=${containerId}&command=restart`);
      alert('Container restarted successfully');
    } catch (error) {
      console.error('Error restarting container:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleRestart} disabled={loading}>
      {loading ? 'Restarting...' : 'Restart'}
    </Button>
  );
};

export default RestartButton;
