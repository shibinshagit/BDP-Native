import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseUrl } from '../constants/BaseUrls';

const apiClient = axios.create({
  baseURL: BaseUrl,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
