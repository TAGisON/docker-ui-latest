// src/pages/Container/Status/Status.js
import React from 'react';
import { useContainerContext } from '../../context/ContainerContext';

const Status = ({ containerId }) => {
  const { state } = useContainerContext();
  const container = state.containers.find(container => container.Id === containerId);
  return <p>Status: {container ? container.State.Status : 'Loading...'}</p>;
};

export default Status;
