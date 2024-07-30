import React, { useState } from 'react';
import axios from 'axios';
// import './ImportPage.css';

const ImportPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.tar')) {
      setSelectedFile(file);
      setError(null);
    } else {
      setSelectedFile(null);
      setError('Only .tar files are allowed.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a .tar file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        'http://192.168.100.146:3230/api/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.status === 200) {
        alert('File uploaded successfully');
        setSelectedFile(null);
        setUploadProgress(0);
      } else {
        setError('Failed to upload the file.');
      }
    } catch (error) {
      setError('Error uploading the file: ' + error.message);
    }
  };

  return (
    <div className="import-page">
      <h2>Import Image from Your Local System</h2>
      <div className="file-upload-container">
        <label htmlFor="file-upload" className="browse-files">
          {selectedFile ? selectedFile.name : 'Browse Files'}
        </label>
        <input
          type="file"
          accept=".tar"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
      </div>
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && (
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress}%
          </div>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ImportPage;
