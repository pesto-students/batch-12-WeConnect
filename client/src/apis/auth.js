import axios from 'axios';
import {apiUrl} from '../constants';

const auth_urls = {
  LOGIN_URL: `${apiUrl}/api/users/login`,
  USER_PROFILE_URL: `${apiUrl}/api/users/me`,
};

const updateUserAuthStatus = () => {
  let updatedState = null;
  try {
    const response = axios
      .get(auth_urls.USER_PROFILE_URL)
      .then((response) => response);
    updatedState = Boolean(response.status === 200);
  } catch {
    updatedState = false;
  }
  return updatedState;
};

const authenticateUser = async (credentials) => {
  let updatedState = null;
  try {
    const response = await axios.post(auth_urls.LOGIN_URL, credentials);
    updatedState = Boolean(response.status === 200);
  } catch (error) {
    updatedState = false;
  }
  return updatedState;
};

export { authenticateUser, updateUserAuthStatus };
