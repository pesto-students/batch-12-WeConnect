import axios from 'axios';
import constants from '../constants/endPoints';

const getProfile = async (data) => {
  const url = constants.BASEURL + constants.UPDATEPROFILE;
  const result = await axios.post(url, data, {
    withCredentials: true,
  });
  return result;
};

export default getProfile;
