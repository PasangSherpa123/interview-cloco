import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', 
  timeout: 10000, 
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized, logging out...');
    
    }
    return Promise.reject(error);
  }
);

export default apiClient;
