// src/pages/Image/RunButton/RunButton.js
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useImageContext } from '../../context/ImageContext';
import CircularProgress from '@mui/material/CircularProgress';

const RunButton = ({ imageId }) => {
  const { runImage } = useImageContext();
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    try {
      await runImage(imageId);
      alert('Image started successfully');
    } catch (error) {
      console.error('Error starting image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton onClick={handleRun} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : <PlayArrowIcon color="success" />}
    </IconButton>
  );
};

export default RunButton;
