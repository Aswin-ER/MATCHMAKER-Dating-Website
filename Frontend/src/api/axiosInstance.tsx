import axios from 'axios'; 

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        
    }
})


axiosInstance.interceptors.response.use(
    (response) => {
        console.log(response)
      if ( response?.data?.message === 'jwt expired') {
        localStorage.removeItem('jwtToken');
        window.location.replace('/login');   
       }
      return response;
    },
    (error) => {
        console.log(error)
      if ( error?.response?.data?.message === 'jwt expired') {
        localStorage.removeItem('jwtToken');
            window.location.replace('/login');
          }
      return Promise.reject(error);
    }
  );