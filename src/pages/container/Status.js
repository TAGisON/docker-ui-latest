import React from 'react';
import { useContainerContext } from '../../context/ContainerContext';

const Status = ({ containerId }) => {
  const { state } = useContainerContext();
  const container = state.containers.find(container => container.Id === containerId);

  const getStatusClass = (status) => {
    switch (status) {
      case 'running':
        return 'status-box active status-label';
      case 'exited':
      case 'stopped':
        return 'status-box stopped status-label';
      default:
        return '';
    }
  };

  return (
    <p>
      {container ? (
        <span className={getStatusClass(container.State.Status)}>
          {container.State.Status}
        </span>
      ) : (
        'Loading...'
      )}
    </p>
  );
};

export default Status;
