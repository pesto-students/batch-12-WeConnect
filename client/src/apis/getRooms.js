import axios from 'axios';
import { baseUrl } from '../constants';

const LoadData = async (location) => {
  console.log(location);
  const response = await axios.get(`${baseUrl}/api${location}`);
  console.log(response);
  if (response.status === 200) {
    return response.data;
  }
};

export default LoadData;
