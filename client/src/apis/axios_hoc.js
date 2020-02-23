import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';


const axiosHOC = (Wrapped) => {
  return (props) => {
    

    const { setUserAuthStatus } = useContext(AuthContext);

    const responseChecker = (response) => {
      if (response.status === 403 || response.status === 401) {
        setUserAuthStatus(false);
      }
      return response;
    };

    const errorChecker = (error) => {
      const status = error.response.status;
      if (status === 403 || status === 401) {
        sessionStorage.setItem('userAuthStatus', null);
      }
      return error;
    };

    useEffect(() => {
      axios.interceptors.response.use(responseChecker, errorChecker)
    });
    return <Wrapped {...props} />
  }
}

export { axiosHOC };