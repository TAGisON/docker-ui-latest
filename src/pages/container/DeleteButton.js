// src/pages/Container/DeleteButton.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

const DeleteButton = ({ containerId }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:3230/api/container?container=${containerId}`);
      alert('Container deleted successfully');
    } catch (error) {
      console.error('Error deleting container:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete'}
    </Button>
  );
};

export default DeleteButton;
