import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { useImageContext } from '../../context/ImageContext';

const DeleteButton = ({ imageId, imageName, onDeleteSuccess }) => {
  const { deleteImage } = useImageContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${imageName}" image?`);
    if (!confirmed) return;

    setLoading(true);
    try {
      await deleteImage(imageId);
      onDeleteSuccess();
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton onClick={handleDelete} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : <DeleteIcon color="error" />}
    </IconButton>
  );
};

export default DeleteButton;
