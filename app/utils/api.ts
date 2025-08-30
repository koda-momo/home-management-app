import axios from 'axios';
import { API_URL } from '~/config';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  const apiAccessKey = import.meta.env.API_ACCESS_KEY;
  if (apiAccessKey) {
    config.headers['x-api-key'] = apiAccessKey;
  }
  return config;
});

export default apiClient;
