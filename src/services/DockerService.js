import axios from 'axios';

const API_URL = 'http://192.168.100.146:3230/api'; // Update with your backend URL

const getContainers = (status) => {
  return axios.get(`${API_URL}/container/fetch?status=${status}`);
};

const getContainerById = (id) => {
  return axios.get(`${API_URL}/container/fetchById?container=${id}`);
};

const runContainerCommand = (id, command) => {
  return axios.get(`${API_URL}/container/command?container=${id}&command=${command}`);
};

const getContainerStats = () => {
  return axios.get(`${API_URL}/container/stats`);
};

const getContainerLogs = (id) => {
  return axios.get(`${API_URL}/container/logs?container=${id}`);
};

const getImages = () => {
  return axios.get(`${API_URL}/image/fetch`);
};

const runImageCommand = (id, command) => {
  return axios.get(`${API_URL}/image/command?image=${id}&command=${command}`);
};

const getGroups = () => {
  return axios.get(`${API_URL}/groups`);
};

const createGroup = (name, containers) => {
  return axios.post(`${API_URL}/groups`, { name, containers });
};

const deleteGroup = (id) => {
  return axios.delete(`${API_URL}/groups?id=${id}`);
};

export default {
  getContainers,
  getContainerById,
  runContainerCommand,
  getContainerStats,
  getContainerLogs,
  getImages,
  runImageCommand,
  getGroups,
  createGroup,
  deleteGroup
};
