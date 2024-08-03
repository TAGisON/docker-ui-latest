import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import FullScreenLoader from '../../components/FullScreenLoader';

const ImportButton = ({ imageName, imagePath }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [error, ] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tag') setTag(value);
    if (name === 'name') setName(value);
  };

  

  const handleImport = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.100.146:3230/api/image/import', { name, tag, imagePath });
      if (response.status === 200) {
        alert('Image imported successfully');
      } else if (response.status === 409) {
        alert('Image with the same name and tag already exists. Please use a different name or tag.');
      } else {
        alert('Failed to import the image');
      }
    } catch (error) {
      alert('Error importing the image: ' + error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} disabled={loading}>
        <ImportExportIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Import Image {imageName} , {imagePath}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Image Name"
            type="text"
            fullWidth
            value={name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="tag"
            label="Tag"
            type="text"
            fullWidth
            value={tag}
            onChange={handleInputChange}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleImport} color="primary" disabled={loading || !name || !tag}>
            Import
          </Button>
        </DialogActions>
      </Dialog>
      {loading && <FullScreenLoader />}
    </>
  );
};

export default ImportButton;
