import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Table from './Table';

const StoppedContainers = () => {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await axios.get('http://192.168.100.146:3230/api/container/fetch?status=stopped');
        setContainers(response.data);
      } catch (error) {
        console.error('Error fetching stopped containers:', error);
      }
    };
    fetchContainers();
  }, []);

  const columns = ['Name', 'Container ID', 'Created', 'Status'];

  return (
    <div className="card-container container">
      {containers.map(container => {
        const data = [{
          'Name': container.Name,
          'Container ID': container.Id.substring(0, 12),
          'Created': new Date(container.Created).toLocaleString(),
          'Status': container.State.Status,
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

export default StoppedContainers;
