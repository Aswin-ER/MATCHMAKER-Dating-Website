import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://makermatch.online', 
  headers: {
    'authorization': `Bearer ${localStorage.getItem('jwtToken')}`

  }
})

export const adminAxiosInstance = axios.create({
  baseURL: 'https://makermatch.online',
  headers: {
    'authorization': `Bearer ${localStorage.getItem('adminToken')}` // Assuming this is the admin JWT token
  }
});


axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response?.data?.message === 'jwt expired') {
      localStorage.removeItem('jwtToken');
      window.location.replace('/login');
    }
    return response;
  },
  (error) => {
    console.log(error)
    if (error?.response?.data?.message === 'jwt expired') {
      localStorage.removeItem('jwtToken');
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);


adminAxiosInstance.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response?.data?.message === 'jwt expired') {
      localStorage.removeItem('adminToken');
      window.location.replace('/admin');
    }
    return response;
  },
  (error) => {
    console.log(error)
    if (error?.response?.data?.message === 'jwt expired') {
      localStorage.removeItem('adminToken');
      window.location.replace('/admin');
    }
    return Promise.reject(error);
  }
);
