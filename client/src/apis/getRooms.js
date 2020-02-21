import axios from 'axios';
import BASE_URL from '../constants';

const LoadData = async (location) => {
  console.log(location);
  const response = await axios.get(`${BASE_URL}/api${location}`);
  console.log(response);
  if (response.status === 200) {
    return response.data;
  }
};

export default LoadData;
