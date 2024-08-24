import axios from "axios";

const url ="http://127.0.0.1:2000";


const Post =(requrl,reqbody)=>{
  return new Promise((resolve,reject)=>{
    axios.post(url+requrl,reqbody)
    .then(function(response){
      if(response.status===200){
        resolve(response);
      }
      else{
        reject(response)
      }
    }).catch(function(error){
      reject(error)
    })
  })
}
export {Post}