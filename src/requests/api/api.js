import axios from 'axios'
import { reject } from 'lodash-es';

 const request = {
    //"URL":"https://oxis-live.herokuapp.com/",
    "URL":'http://localhost:4500/'
}



let api = axios.create({
  baseURL: request.URL, 
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    }
  ,
  validateStatus: (status) => status < 500
});


export const createMethod = async (data,path)=>{
   try{
    const resp = await api.post(`${request.URL}${path}/create`,{
      data
     
      })
     return resp.data;
   }catch(err){
     return  new Promise.reject(err)
   }

}

//   export const getAllMethodJogadas= async ()=>{
//     const resp = await fetch(`${request.URL}${'gameplay/allJogadas'}`);

//    return await resp.json();
    
//   };


  export const getAllMethodJogadas= async ()=>{
   
   try{
    const resp = await api.get(`${request.URL}${'gameplay/allJogadas'}`);

    return  resp.data;
   }catch(err){
     return  new Promise.reject(err)
   }
    
  };

