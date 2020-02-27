import axios from 'axios';
import { apiUrl } from '../constants';

const LoadData = async (location) => {
  const response = await axios.get(`${apiUrl}/api${location}`);
  if (response.status === 200) {
    return response.data;
  }
};

export default LoadData;
