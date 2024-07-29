// src/context/ImageContext.js
import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const ImageContext = createContext();

const imageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return { ...state, images: action.payload };
    case 'UPDATE_IMAGE':
      return {
        ...state,
        images: state.images.map(image =>
          image.ID === action.payload.ID ? action.payload : image
        ),
      };
    case 'REMOVE_IMAGE':
      return {
        ...state,
        images: state.images.filter(image => image.ID !== action.payload)
      };
    default:
      return state;
  }
};

export const ImageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(imageReducer, { images: [] });

  const fetchImages = async () => {
    try {
      const response = await axios.get(`http://192.168.100.146:3230/api/image/fetch`);
      dispatch({ type: 'SET_IMAGES', payload: response.data });
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const runImage = async (imageId) => {
    try {
      await axios.get(`http://192.168.100.146:3230/api/image/command?image=${imageId}&command=run`);
      alert('Image run successfully');
    } catch (error) {
      console.error('Error running image:', error);
    }
  };

  const deleteImage = async (imageId) => {
    try {
      await axios.get(`http://192.168.100.146:3230/api/image/command?image=${imageId}&command=rmi`);
      dispatch({ type: 'REMOVE_IMAGE', payload: imageId });
      alert('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <ImageContext.Provider value={{ state, fetchImages, runImage, deleteImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
