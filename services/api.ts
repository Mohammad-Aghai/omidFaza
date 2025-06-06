import { UserData } from "@/app/components/Users";
import axios from "axios";

//root Api
const API_URL = "https://reqres.in/api";

//All CRUD 
export  const fetchUsersApi = async () => {
  const response = await axios.get(`${API_URL}/users`,{
    headers :{
      'x-api-key' : 'reqres-free-v1',
       'Accept' : 'application/json'
    }
  });
  return response.data; 
};
// create User
export const createUserApi =  async (user : {email : string , password : string})=>{
    const response  = await axios.post(`${API_URL}/users`, user)
    return response.data
}
// update User 
export const updateUserApi =  async (user : UserData)=>{
const response = await axios.post(`${API_URL}/users`, user, {
  headers: {
    'x-api-key': 'reqres-free-v1',
    'Accept': 'application/json',
  }
});
return response.data
}
// delete User
export const deleteUserApi = async (id: string | number) => {
   await axios.delete(`${API_URL}/users/${id}`,{
    headers :{
      'x-api-key' : 'reqres-free-v1',
       'Accept' : 'application/json'
    }
  });
};

//signIn user 
export const signInUserApi =  async (user : {email : string , password : string})=>{
    const response  = await axios.post(`${API_URL}/login`, user,{
   headers :{
      'x-api-key' : 'reqres-free-v1',
       'Accept' : 'application/json'
    }
    }) 
    return response.data
}


//signUp user 
export const signUpUserApi =  async (user : {email : string , password : string})=>{
    const response  = await axios.post(`${API_URL}/register`, user,{
   headers :{ 
      'x-api-key' : 'reqres-free-v1',
       'Accept' : 'application/json'
    }
    })
    return response.data
}