import React, { useEffect } from 'react';
import { useContainerContext } from '../context/ContainerContext';
import Card from './Card';
import Table from './Table';
import RestartButton from './container/RestartButton';
import DeleteButton from './container/DeleteButton';
import Status from './container/Status';
import StopStartButton from './container/StopStartButton';

const AllContainers = () => {
  const { state, fetchContainers } = useContainerContext();

  useEffect(() => {
    fetchContainers();
  }, []);

  const columns = ['Name', 'Container ID', 'Created', 'Status', 'Actions'];

  return (
    <div className="card-container container">
      {state.containers.length > 0 ? (
        state.containers.map(container => {
          const data = [{
            'Name': container.Name,
            'Container ID': container.Id.substring(0, 12),
            'Created': new Date(container.Created).toLocaleString(),
            'Status': (<Status containerId={container.Id} />),
            'Actions': (
              <>
                <RestartButton containerId={container.Id} />
                <StopStartButton containerId={container.Id} />
                <DeleteButton containerId={container.Id} />
              </>
            )
          }];

          return (
            <Card key={container.Id}>
              <Table columns={columns} data={data} />
            </Card>
          );
        })
      ) : (
        <div className="no-images-message">
          <p>There are no any containers in the System.</p>
        </div>
      )}
    </div>
  );
};

export default AllContainers;