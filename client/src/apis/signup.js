import axios from 'axios';
import { apiUrl } from '../constants';

const urls = {
  SIGNUP_URL: `${apiUrl}/api/users/register`,
};

const registerUser = (userData, notify) => {
  const request = axios.post(urls.SIGNUP_URL, userData);
  const response = request.then((response) => response);
  if (response.status === 200) {
    notify({
      display: true,
      severity: 'success',
      text: 'Your signup was successful.',
    });
  } else if (response.status === 400) {
    notify({
      display: true,
      severity: 'error',
      text: 'Your data is invalid.Please verify the data',
    });
  }
};

export { registerUser };
