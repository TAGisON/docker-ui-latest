import React, { useEffect } from 'react';
import { useContainerContext } from '../context/ContainerContext';
import Card from './Card';
import Table from './Table';
import ExportButton from './image/ExportButton';
// import './ExportPage.css';

const ExportPage = () => {
  const { state, fetchContainers } = useContainerContext();

  useEffect(() => {
    fetchContainers();
  }, []);

  const columns = ['Name', 'Created On', 'Actions'];

  return (
    <div className="card-container container">
      {state.containers.map(container => {
        const data = [{
          'Name': container.Name,
          'Created On': new Date(container.Created).toLocaleString(),
          'Actions': (<ExportButton container={container} />)
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

export default ExportPage;
