import axios from 'axios';
import constants from '../constants/endPoints';

const getBookings = async () => {
  const url = constants.BASEURL + constants.GETBOOKINGS;
  const result = await axios.get(url, {
    withCredentials: true,
  });
  return result;
};

export default getBookings;
