import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import FullScreenLoader from '../../components/FullScreenLoader';

const DeleteSystemImageButton = ({ imageId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`http://192.168.100.146:3230/api/image/${imageId}`);
      alert('Image deleted successfully');
      onDeleteSuccess();
    } catch (error) {
      alert('Error deleting the image: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton onClick={handleDelete} disabled={loading}>
        <DeleteIcon color="secondary" />
      </IconButton>
      {loading && <FullScreenLoader />}
    </>
  );
};

export default DeleteSystemImageButton;
