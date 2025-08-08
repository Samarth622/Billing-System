import axios from 'axios';  
import { toast } from 'react-hot-toast';  
  
const setupAxiosInterceptors = (setAuthData) => {  
  axios.interceptors.response.use(  
    (response) => response,  
    (error) => {  
      if (error.response?.status === 401 &&   
          error.response?.data?.code === 'TOKEN_EXPIRED') {  
        localStorage.removeItem('token');  
        localStorage.removeItem('user');  
        setAuthData(null, null);  
        toast.error('Session expired. Please login again.');  
        window.location.href = '/login';  
      }  
      return Promise.reject(error);  
    }  
  );  
};  
  
export default setupAxiosInterceptors;