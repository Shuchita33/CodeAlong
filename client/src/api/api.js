import axios from 'axios';
const API= axios.create({
  baseURL: 'https://localhost:5000', // Your backend server URL
});

API.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')){
      JSON.parse(localStorage.getItem('profile'))
      req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
})

export const signIn=(formData)=>API.post('/user/signin',formData);
export const signUp=(formData)=>API.post('/user/signup',formData);

export default API;
