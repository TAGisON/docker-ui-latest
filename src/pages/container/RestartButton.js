import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import RestartIcon from '@mui/icons-material/RestartAlt';
import { useContainerContext } from '../../context/ContainerContext';

const RestartButton = ({ containerId }) => {
  const { updateContainerState } = useContainerContext();
  const [loading, setLoading] = useState(false);

  const handleRestart = async () => {
    setLoading(true);
    try {
      await updateContainerState(containerId, 'restart');
      alert('Container restarted successfully');
    } catch (error) {
      console.error('Error restarting container:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton onClick={handleRestart} disabled={loading}>
      <RestartIcon color={loading ? "disabled" : "primary"} />
    </IconButton>
  );
};

export default RestartButton;
