// src/pages/Container/ToggleSwitch/ToggleSwitch.js
import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { useContainerContext } from '../../context/ContainerContext';

const ToggleSwitch = ({ containerId, initialStatus }) => {
  const [loading, setLoading] = useState(false);
  const { state, updateContainerState } = useContainerContext();

  const handleToggle = async () => {
    const command = state.containers.find(container => container.Id === containerId).State.Running ? 'stop' : 'start';
    setLoading(true);
    try {
      await updateContainerState(containerId, command);
      alert(`Container ${command}ped successfully`);
    } catch (error) {
      console.error(`Error ${command}ping container:`, error);
    } finally {
      setLoading(false);
    }
  };

  const container = state.containers.find(container => container.Id === containerId);
  const isRunning = container && container.State.Running;

  return (
    <Switch
      checked={isRunning}
      onChange={handleToggle}
      color="primary"
      disabled={loading}
      checkedIcon={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>On</div>}
      uncheckedIcon={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Off</div>}
    />
  );
};

export default ToggleSwitch;
