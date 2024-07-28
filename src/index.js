// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContainerProvider } from './context/ContainerContext';
import { ImageProvider } from './context/ImageContext';

ReactDOM.render(
  <ContainerProvider>
    <ImageProvider>
      <App />
    </ImageProvider>
  </ContainerProvider>,
  document.getElementById('root')
);
