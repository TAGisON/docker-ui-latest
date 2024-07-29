import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import './Dashboard.css';

const Dashboard = () => {
  const [containerCount, setContainerCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [networkCount, setNetworkCount] = useState(0);
  const [volumeCount, setVolumeCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const containerResponse = await axios.get('http://192.168.100.146:3230/api/container/fetch?status=all');
        setContainerCount(containerResponse.data.length);

        const imageResponse = await axios.get('http://192.168.100.146:3230/api/image/fetch');
        setImageCount(imageResponse.data.length);

        const networkResponse = await axios.get('http://192.168.100.146:3230/api/network/list');
        setNetworkCount(networkResponse.data.length);

        const volumeResponse = await axios.get('http://192.168.100.146:3230/api/volume/list');
        setVolumeCount(volumeResponse.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div>
        <Card title="Containers">
          <p>Number of Containers: {containerCount}</p>
        </Card>
        <Card title="Images">
          <p>Number of Images: {imageCount}</p>
        </Card>
      </div>
      
      <div>
      <Card title="Networks">
        <p>Number of Networks: {networkCount}</p>
      </Card>
      <Card title="Volumes">
        <p>Number of Volumes: {volumeCount}</p>
      </Card>
      </div>
    </div>
  );
};

export default Dashboard;
