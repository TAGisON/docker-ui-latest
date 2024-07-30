import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from './Card';
import Table from './Table';
import RunButton from './image/RunButton';
import DeleteButton from './image/DeleteButton';
// import './ActiveImages.css';

const initialState = {
  images: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, images: action.payload };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const ActiveImages = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://192.168.100.146:3230/api/image/fetch');
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
    fetchImages();
  }, []);

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
                <RunButton imageId={image.ID} />
                <DeleteButton imageId={image.ID} />
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