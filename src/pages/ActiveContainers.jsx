import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Table from './Table';

const ActiveContainers = () => {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await axios.get('http://192.168.100.146:3230/api/container/fetch?status=active');
        setContainers(response.data);
      } catch (error) {
        console.error('Error fetching active containers:', error);
      }
    };
    fetchContainers();
  }, []);

  const columns = ['Name', 'Container ID', 'Created', 'Status'];

  return (
    <div className="card-container container">
      {containers.length > 0 ? (
        containers.map(container => {
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
        })
      ) : (
        <div className="no-images-message">
          <p>There are no running containers.</p>
        </div>
      )}
    </div>
  );
};

export default ActiveContainers;
