import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
// import './Dashboard.css';
import { FaDocker } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { FaNetworkWired } from "react-icons/fa6";
import { GrStorage } from "react-icons/gr";



const Dashboard = () => {
  const [containerCount, setContainerCount] = useState(0);
  const [activeContainerCount, setActiveContainerCount] = useState(0);
  const [stoppedContainerCount, setStoppedContainerCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [networkCount, setNetworkCount] = useState(0);
  const [volumeCount, setVolumeCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const containerResponse = await axios.get('http://192.168.100.146:3230/api/container/fetch?status=all');
        setContainerCount(containerResponse.data.length);

        const activeContainerResponse = await axios.get('http://192.168.100.146:3230/api/container/fetch?status=active');
        setActiveContainerCount(activeContainerResponse.data.length);

        const stoppedContainerResponse = await axios.get('http://192.168.100.146:3230/api/container/fetch?status=stopped');
        setStoppedContainerCount(stoppedContainerResponse.data.length);

        const imageResponse = await axios.get('http://192.168.100.146:3230/api/image/fetch');
        setImageCount(imageResponse.data.length);

        const networkResponse = await axios.get('http://192.168.100.146:3230/api/networks');
        setNetworkCount(networkResponse.data.length);

        const volumeResponse = await axios.get('http://192.168.100.146:3230/api/volumes');
        setVolumeCount(volumeResponse.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="card-container">
        <Card
        icon= {<FaDocker color='#1c28c9' />}
        title="Containers"       
        activeTitle ="Active"
        stoppedTitle="Stopped"
        active={activeContainerCount}
        stopped={stoppedContainerCount}>
          <p> {containerCount}</p>
        </Card>
        <Card 
        icon={<FaImage color='#1c28c9'/>}
        title="Images">
          <p> {imageCount}</p>
        </Card>
      </div>
      
      <div className="card-container">
      <Card 
      icon={<FaNetworkWired color='#1c28c9'/>}
      title="Networks">
        <p> {networkCount} </p>
      </Card>
      <Card 
      icon={<GrStorage color='#1c28c9' />     }
      title="Volumes">
        <p>{volumeCount}</p>
      </Card>
      </div>
    </div>
  );
};

export default Dashboard;
