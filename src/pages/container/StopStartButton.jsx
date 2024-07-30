import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { useContainerContext } from '../../context/ContainerContext';

const StopStartButton = ({ containerId }) => {
  const { state, updateContainerState } = useContainerContext();
  const [loading, setLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const container = state.containers.find(container => container.Id === containerId);
    if (container) {
      setIsRunning(container.State.Status === 'running');
    }
  }, [state.containers, containerId]);

  const handleAction = async () => {
    setLoading(true);
    try {
      const action = isRunning ? 'stop' : 'start';
      await updateContainerState(containerId, action);
      alert(`Container ${isRunning ? 'stopped' : 'started'} successfully`);
      setIsRunning(!isRunning);
    } catch (error) {
      console.error(`Error ${isRunning ? 'stopping' : 'starting'} container:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton onClick={handleAction} disabled={loading} className="stop-start-button">
      {loading ? (
        <div className="loading-spinner"></div>
      ) : isRunning ? (
        <StopIcon color="warning" />
      ) : (
        <PlayArrowIcon color='success' />
      )}
    </IconButton>
  );
};

export default StopStartButton;
