import axios from 'axios';
import { apiUrl } from '../constants';

const auth_urls = {
  LOGIN_URL: `${apiUrl}/api/users/login`,
  USER_PROFILE_URL: `${apiUrl}/api/users/me`,
  LOGOUT_URL: `${apiUrl}/api/users/me/logout`,
};

const verifyUserAuthStatus = async () => {
  let newState = null;
  try {
    const response = await axios.get(auth_urls.USER_PROFILE_URL, {
      withCredentials: true,
    });
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
    const response = await axios.post(
      auth_urls.LOGOUT_URL,
      {},
      {
        withCredentials: true,
      },
    );
    return Boolean(response.status === 200);
  } catch (error) {
    return false;
  }
};

export { authenticateUser, verifyUserAuthStatus, logoutUser };
