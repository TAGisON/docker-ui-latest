import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Switch from 'react-switch';
import Card from './Card';
import Table from './Table';
import './ActiveContainers.css';

const ActiveContainers = () => {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3230/api/container/fetch?status=active');
        setContainers(response.data);
      } catch (error) {
        console.error('Error fetching active containers:', error);
      }
    };
    fetchContainers();
  }, []);

  const handleToggle = async (containerId, currentState) => {
    const command = currentState ? 'stop' : 'start';
    try {
      await axios.get(`http://127.0.0.1:3230/api/container/command?container=${containerId}&command=${command}`);
      const response = await axios.get('http://127.0.0.1:3230/api/container/fetch?status=active');
      setContainers(response.data);
    } catch (error) {
      console.error(`Error ${command}ing container:`, error);
    }
  };

  const columns = ['CONTAINER ID', 'IMAGE', 'COMMAND', 'CREATED', 'STATUS', 'PORTS', 'NAMES', 'ACTIONS'];

  return (
    <div className="card-container">
      {containers.map(container => {
        const data = [{
          'CONTAINER ID': container.Id.substring(0, 12),
          'IMAGE': container.Image,
          'COMMAND': container.Command,
          'CREATED': new Date(container.Created).toLocaleString(),
          'STATUS': container.State.Status,
          'PORTS': container.Ports || '',
          'NAMES': container.Name,
          'ACTIONS': (
            <Switch
              checked={container.State.Running}
              onChange={() => handleToggle(container.Id, container.State.Running)}
              checkedIcon={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>On</div>}
              uncheckedIcon={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Off</div>}
            />
          )
        }];

        return (
          <Card title={container.Name} key={container.Id}>
            <Table columns={columns} data={data} />
          </Card>
        );
      })}
    </div>
  );
};

export default ActiveContainers;
