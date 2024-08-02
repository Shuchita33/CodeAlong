import axios from 'axios';
const API= axios.create({
  baseURL: 'http://localhost:5000', // Your backend server URL
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

export const getData=(id)=>API.get(`/user/${id}/workspaces`);
export const addData=(id,newWs)=>API.post(`/user/${id}/workspaces`,newWs);
export const deleteWorkspace = (userId, wsId) => API.delete(`/user/${userId}/workspaces/${wsId}`);
export const updateWorkspaceName = (userId, wsId, newName) => API.patch(`/user/${userId}/workspaces/${wsId}`, { title: newName });

export default API;
