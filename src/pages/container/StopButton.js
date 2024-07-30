import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import StopIcon from '@mui/icons-material/Stop';
import { useContainerContext } from '../../context/ContainerContext';

const StopButton = ({ containerId }) => {
  const { updateContainerState } = useContainerContext();
  const [loading, setLoading] = useState(false);

  const handleStop = async () => {
    setLoading(true);
    try {
      await updateContainerState(containerId, 'stop');
      alert('Container stopped successfully');
    } catch (error) {
      console.error('Error stopping container:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton onClick={handleStop} disabled={loading}>
      <StopIcon color={loading ? "disabled" : "error"} />
    </IconButton>
  );
};

export default StopButton;
