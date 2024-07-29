// src/context/ContainerContext.js
import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const ContainerContext = createContext();

const containerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTAINERS':
      return { ...state, containers: action.payload };
    case 'UPDATE_CONTAINER':
      return {
        ...state,
        containers: state.containers.map(container =>
          container.Id === action.payload.Id ? action.payload : container
        ),
      };
    default:
      return state;
  }
};

export const ContainerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(containerReducer, { containers: [] });

  const fetchContainers = async (status = 'all') => {
    try {
      const response = await axios.get(`http://192.168.100.146:3230/api/container/fetch?status=${status}`);
      dispatch({ type: 'SET_CONTAINERS', payload: response.data });
    } catch (error) {
      console.error('Error fetching containers:', error);
    }
  };

  const updateContainerState = async (containerId, command) => {
    try {
      await axios.get(`http://192.168.100.146:3230/api/container/command?container=${containerId}&command=${command}`);
      const response = await axios.get(`http://192.168.100.146:3230/api/container/fetchById?container=${containerId}`);
      dispatch({ type: 'UPDATE_CONTAINER', payload: response.data });
    } catch (error) {
      console.error(`Error updating container state:`, error);
    }
  };

  return (
    <ContainerContext.Provider value={{ state, fetchContainers, updateContainerState }}>
      {children}
    </ContainerContext.Provider>
  );
};

export const useContainerContext = () => useContext(ContainerContext);
