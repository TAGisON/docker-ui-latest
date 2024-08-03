import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Table from './Table';
import ImportButton from './image/ImportButton';
import DeleteSystemImageButton from './image/DeleteSystemImageButton';
// import './SystemImages.css';

const SystemImages = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://192.168.100.146:3230/api/system-images');
        setImages(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setImages([]);
        } else {
          setError('Error fetching system images: ' + error.message);
        }
      }
    };

    fetchImages();
  }, []);

  const handleDeleteSuccess = () => {
    // Re-fetch images after successful deletion
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://192.168.100.146:3230/api/system-images');
        setImages(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setImages([]);
        } else {
          setError('Error fetching system images: ' + error.message);
        }
      }
    };

    fetchImages();
  };

  const columns = ['Name', 'Actions'];

  return (
    <div className="card-container">
      {images.length > 0 ? (
        images.map(image => {
          const data = [{
            'Name': image.name,
            'Actions': (
              <>
                <ImportButton imageName={image.name} imagePath={image.path} />
                <DeleteSystemImageButton imageId={image.id} onDeleteSuccess={handleDeleteSuccess} />
              </>
            )
          }];

          return (
            <Card title={image.name} key={image.id}>
              <Table columns={columns} data={data} />
            </Card>
          );
        })
      ) : (
        <div className="no-images-message">
          No system images found
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SystemImages;
