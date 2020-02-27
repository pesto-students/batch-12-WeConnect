import axios from 'axios';
import { apiUrl } from '../constants';
import { baseUrl } from '../constants';

const LoadData = async (query) => {
  const response = await axios.get(apiUrl + '/api/workspace/' + query);
  if (response.status < 300) {
    const { data } = response;
    return data;
  }
  return [];
};

const getOwnerWorkplace = async () => {
  const response = await axios.get(baseUrl + '/api/workspace/owner', {
    withCredentials: true,
  });
  if (response.status < 300) {
    const { data } = response;
    return data;
  }
  return {};
};

const getWorkSpaceData = async (query) => {
  const { workspaces } = await LoadData(query);
  if (workspaces != null && workspaces.length > 0) {
    return workspaces;
  }
  return [];
};

export { getWorkSpaceData, getOwnerWorkplace };
