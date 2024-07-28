// src/pages/Image/DeleteButton/DeleteButton.js
import React from 'react';
import { useImageContext } from '../../context/ImageContext';

const DeleteButton = ({ imageId }) => {
  const { deleteImage } = useImageContext();

  const handleDelete = async () => {
    await deleteImage(imageId);
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteButton;
