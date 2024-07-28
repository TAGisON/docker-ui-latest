import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContainerList.css';

const ContainerList = () => {
  const [containers, setContainers] = useState([]);
  const [status, setStatus] = useState('all');

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3230/api/container/fetch?status=${status}`);
        setContainers(response.data);
      } catch (error) {
        console.error('Error fetching containers:', error);
      }
    };
    fetchContainers();
  }, [status]);

  return (
    <div className="container-list">
      <h2>Containers</h2>
      <div className="container-types">
        <button onClick={() => setStatus('all')}>All</button>
        <button onClick={() => setStatus('active')}>Active</button>
        <button onClick={() => setStatus('stopped')}>Stopped</button>
      </div>
      <div className="card-container">
        {containers.map(container => (
          <div className="card" key={container.Id}>
            <h3>{container.Name}</h3>
            <p>Status: {container.State.Status}</p>
            <p>Created: {new Date(container.Created).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContainerList;
