import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Table from './Table';
import RestartButton from './container/RestartButton';
import DeleteButton from './container/DeleteButton';

const AllContainers = () => {
  const [containers, setContainers] = useState([]);
  const [status, setStatus] = useState('all');

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await axios.get(`http://192.168.100.146:3230/api/container/fetch?status=${status}`);
        setContainers(response.data);
      } catch (error) {
        console.error('Error fetching containers:', error);
      }
    };
    fetchContainers();
  }, [status]);

  const columns = ['Name', 'Container ID', 'Created', 'Status', 'Actions'];

  return (
    <div className="card-container">
      {containers.map(container => {
        const data = [{
          'Name': container.Name,
          'Container ID': container.Id.substring(0, 12),
          'Created': new Date(container.Created).toLocaleString(),
          'Status': container.State.Status,
          'Actions': (
            <>
              <RestartButton containerId={container.Id} />
              <DeleteButton containerId={container.Id} />
            </>
          )// Placeholder for future actions
        }];

        return (
          <Card key={container.Id}>
            <Table columns={columns} data={data} />
          </Card>
        );
      })}
    </div>
  );
};

export default AllContainers;
