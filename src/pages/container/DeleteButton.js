import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContainerContext } from '../../context/ContainerContext';

const DeleteButton = ({ containerId }) => {
  const { updateContainerState } = useContainerContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await updateContainerState(containerId, 'delete');
      alert('Container deleted successfully');
    } catch (error) {
      console.error('Error deleting container:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton onClick={handleDelete} disabled={loading}>
      <DeleteIcon color={loading ? "disabled" : "error"} />
    </IconButton>
  );
};

export default DeleteButton;
