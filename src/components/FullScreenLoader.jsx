import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
// import './FullScreenLoader.css';

const FullScreenLoader = () => {
  return (
    <div className="fullscreen-loader">
      <CircularProgress size={60} />
      <p>Importing image...</p>
    </div>
  );
};

export default FullScreenLoader;
