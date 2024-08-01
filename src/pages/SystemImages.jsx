import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import DeployButton from './image/DeployButton';
// import './SystemImages.css';

const SystemImages = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://192.168.100.146:3230/api/system-images'); // Placeholder for API
        setImages(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // No images found, do nothing
          setImages([]);
        } else {
          setError('Error fetching system images: ' + error.message);
        }
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="card-container">
      {images.length > 0 ? (
        images.map(image => (
          <Card title={image.name} key={image.id}>
            <div className="image-details">
              <p>{image.path}</p>
              <DeployButton imageName={image.name} />
            </div>
          </Card>
        ))
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
