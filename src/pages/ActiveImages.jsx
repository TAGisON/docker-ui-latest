import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import Card from './Card';
import Table from './Table';
import DeleteButton from './image/DeleteButton';
import DeployButton from './image/DeployButton';
// import './ActiveImages.css';

const ActiveImages = () => {
  const { state, fetchImages } = useImageContext();

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const columns = ['IMAGE ID', 'REPOSITORY', 'TAG', 'CREATED', 'SIZE', 'ACTIONS'];

  return (
    <div className="card-container">
      {state.images.length > 0 ? (
        state.images.map(image => {
          const data = [{
            'IMAGE ID': image.ID.substring(0, 12),
            'REPOSITORY': image.Repository,
            'TAG': image.Tag || 'latest', // Assuming tag could be missing and default to 'latest'
            'CREATED': image.CreatedSince,
            'SIZE': image.Size,
            'ACTIONS': (
              <>
                <DeployButton imageName={image.Repository} key={image.Id} Tag={image.Tag} />
                <DeleteButton
                  imageId={image.ID}
                  imageName={image.Repository}
                  onDeleteSuccess={fetchImages}
                />
              </>
            )
          }];

          return (
            <Card title={image.Repository} key={image.ID}>
              <Table columns={columns} data={data} />
            </Card>
          );
        })
      ) : (
        <div className="no-images-message">
          <p>Currently there are no active images in the system. Kindly <Link to="/images/import">import</Link>.</p>
        </div>
      )}
    </div>
  );
};

export default ActiveImages;
