import  axiosInstance  from "./axiosInstance";
import { useAuthStore } from "../store/authStore";


export const signup = async(firstName:string,lastName:string,email:string,password:string)=>{    
    const res = await axiosInstance.post('/auth/signup',{firstName,lastName,email,password})
    
    return res.data
};


export const login = async(email:string,password:string)=>{
    const res = await axiosInstance.post('/auth/login',{email,password});

    if(res.data?.accessToken){
        useAuthStore.getState().setAuth(res.data.accessToken,res.data.user);

    }

    return res.data
};