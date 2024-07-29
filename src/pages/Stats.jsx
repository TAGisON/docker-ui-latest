import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component
import Table from './Table'; // Import the Table component

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [containerNames, setContainerNames] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://192.168.100.146:3230/api/container/stats');
        setStats(response.data);

        const names = {};
        for (const stat of response.data) {
          const containerResponse = await axios.get(`http://192.168.100.146:3230/api/container/fetchById?container=${stat.id}`);
          names[stat.id] = containerResponse.data.Name;
        }
        setContainerNames(names);
      } catch (error) {
        console.error('Error fetching stats or container names:', error);
      }
    };

    fetchStats();
  }, []);

  const columns = ['Metric', 'CPU Usage', 'Memory Usage', 'Network I/O'];

  return (
    <div className="stats">
      <h2>System Statistics</h2>
      <div className="stats-container">
        {stats.map((stat, index) => {
          const data = [
            {
              'Metric': 'Value',
              'CPU Usage': stat.cpu_percentage,
              'Memory Usage': stat.memory_usage,
              'Network I/O': stat.network_io
            }
          ];

          return (
            <Card title={`Container: ${containerNames[stat.id] || stat.id}`} key={index}>
              <Table columns={columns} data={data} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;
