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
  }, [fetchContainers]);

  const columns = ['Name', 'Created On', 'Actions'];

  return (
    <div className="card-container container">
      {state.containers.length > 0 ? (
        state.containers.map(container => {
          const data = [{
            'Name': container.Name,
            'Created On': new Date(container.Created).toLocaleString(),
            'Actions': (<ExportButton containerId={container.Id} containerName={container.Name} containerStatus={container.State.Status} />)
          }];

          return (
            <Card key={container.Id}>
              <Table columns={columns} data={data} />
            </Card>
          );
        })
      ) : (
        <div className="no-images-message">
          <p>No containers available in the system to create an image.</p>
        </div>
      )}
    </div>
  );
};

export default ExportPage;
