import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component
import Table from './Table'; // Import the Table component
import './Stats.css';

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.100.146:3230/api/container/stats')
      .then(response => setStats(response.data))
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  const columns = ['Metric', 'Value'];

  return (
    <div className="stats">
      <h2>System Statistics</h2>
      <div className="stats-container">
        {stats.map((stat, index) => {
          const data = [
            { 'Metric': 'CPU Usage', 'Value': stat.cpu_percentage },
            { 'Metric': 'Memory Usage', 'Value': stat.memory_usage },
            { 'Metric': 'Network I/O', 'Value': stat.network_io }
          ];

          return (
            <Card title={`Container ID: ${stat.id}`} key={index}>
              <Table columns={columns} data={data} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;
