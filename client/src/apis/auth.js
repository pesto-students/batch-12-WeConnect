import axios from 'axios';
import { apiUrl } from '../constants';

const auth_urls = {
  LOGIN_URL: `${apiUrl}/api/users/login`,
  USER_PROFILE_URL: `${apiUrl}/api/users/me`,
  LOGOUT_URL: `${apiUrl}/api/users/logout`,
};

const verifyUserAuthStatus = () => {
  let newState = null;
  try {
    const response = axios
      .get(auth_urls.USER_PROFILE_URL)
      .then((response) => response);
    newState = Boolean(response.status === 200);
  } catch {
    newState = false;
  }
  return newState;
};

const authenticateUser = async (credentials) => {
  let newState = null;
  try {
    const response = await axios.post(auth_urls.LOGIN_URL, credentials, {
      withCredentials: true,
    });
    newState = Boolean(response.status === 200);
  } catch (error) {
    newState = false;
  }
  return newState;
};

const logoutUser = async () => {
  try {
    const response = await axios.post(auth_urls.LOGOUT_URL, {});
    return Boolean(response.status === 200);
  } catch (error) {
    return false;
  }
};

export { authenticateUser, verifyUserAuthStatus, logoutUser };
