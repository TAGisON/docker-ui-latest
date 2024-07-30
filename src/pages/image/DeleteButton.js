// src/pages/Image/DeleteButton/DeleteButton.js
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useImageContext } from '../../context/ImageContext';
import CircularProgress from '@mui/material/CircularProgress';

const DeleteButton = ({ imageId }) => {
  const { deleteImage } = useImageContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this image?');
    if (!confirmed) return;

    setLoading(true);
    try {
      await deleteImage(imageId);
      alert('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton onClick={handleDelete} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : <DeleteIcon color="secondary" />}
    </IconButton>
  );
};

export default DeleteButton;
