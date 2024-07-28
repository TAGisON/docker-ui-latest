import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Logs.css';

const Logs = ({ containerId }) => {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    axios.get(/api/containers/{containerId}/logs)
      .then(response => setLogs(response.data))
      .catch(error => console.error('Error fetching logs:', error));
  }, [containerId]);

  return (
    <div className="logs">
      <h2>Logs for Container: {containerId}</h2>
      <pre>{logs}</pre>
    </div>
  );
};

export default Logs;