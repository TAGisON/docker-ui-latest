// src/pages/Image/RunButton/RunButton.js
import React from 'react';
import { useImageContext } from '../../context/ImageContext';

const RunButton = ({ imageId }) => {
  const { runImage } = useImageContext();

  const handleRun = async () => {
    await runImage(imageId);
  };

  return (
    <button onClick={handleRun}>Run</button>
  );
};

export default RunButton;
