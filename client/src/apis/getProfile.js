import axios from 'axios';
import constants from '../constants/endPoints';

const getProfile = async () => {
  const url = constants.BASEURL + constants.GETPROFILE;
  const result = await axios.get(url, {
    withCredentials: true,
  });
  return result;
};

export default getProfile;
