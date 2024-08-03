import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const DeployButton = ({ imageName, Tag }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    hostname: '',
    network: 'localnet',
    ip: '',
    restart: 'always',
    privileged: 'true',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeploy = async () => {
    setLoading(true);
    try {
      const containerNameResponse = await axios.get('http://192.168.100.146:3230/api/container/fetch');
      const existingContainers = containerNameResponse.data;
      if (existingContainers.some((container) => container.Name === formData.name)) {
        alert('Container name already present, choose a different name');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://192.168.100.146:3230/api/image/deploy', { ...formData, imageName, tag: Tag });
      if (response.status === 200) {
        alert('Image deployed successfully');
      } else {
        alert('Failed to deploy the image');
      }
    } catch (error) {
      alert('Error deploying the image: ' + error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : <CloudUploadIcon color="primary" />}
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Deploy Image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="hostname"
            label="Hostname"
            type="text"
            fullWidth
            value={formData.hostname}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="network"
            label="Network"
            type="text"
            fullWidth
            value={formData.network}
            InputProps={{ readOnly: true }}
          />
          <TextField
            margin="dense"
            name="ip"
            label="IP"
            type="text"
            fullWidth
            value={formData.ip}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="restart"
            label="Restart Policy"
            type="text"
            fullWidth
            value={formData.restart}
            InputProps={{ readOnly: true }}
          />
          <TextField
            margin="dense"
            name="privileged"
            label="Privileged"
            type="text"
            fullWidth
            value={formData.privileged}
            InputProps={{ readOnly: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeploy} color="primary" disabled={loading || !formData.name || !formData.hostname}>
            {loading ? <CircularProgress size={24} /> : 'Deploy'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeployButton;
