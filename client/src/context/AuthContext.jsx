import React from "react";
export const AuthContext=React.createContext();
import api from '../utils/axios';

export const AuthProvider=({children})=>{
    const [user,setUser]=React.useState(null);
    const [loading,setLoding]=React.useState(true);


    React.useEffect(()=>{
        const storedUser=localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
        setLoding(false)
    },[]);

    const login= async(email, password)=>{
        try {
            const {data}=await api.post('/auth/login',{email, password});
            setUser(data);
             localStorage.setItem('user',JSON.stringify(data));
             localStorage.setItem('token',data.token);
             return data;
        } catch (error) {
          console.error('Login failed:',error) ;
          throw error; 
        }
    };

    const register=async(name,email,password)=>{
       try {
        const {data}=await api.post('/auth/register',{name,email,password});
        setUser(data);
        return data;
       } catch (error) {
        console.error('register error:',error);
        throw error;
       }  
    }
    const verifyOtp=async(email, otp)=>{
        try {
            const {data}=await api.post('/auth/verify-otp',{
                email,otp
            });
            setUser(data);
            localStorage.setItem('user',JSON.stringify(data));
            localStorage.setItem('token',data.token);
            return data;
        } catch (error) {
          console.error('OTP verification failed:',error);
          throw error;  
        }
    }

    const logout=()=>{
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token')
    }

     return(
        <AuthContext.Provider value={{user,register,loading,login,logout, verifyOtp}}>
            {children}
        </AuthContext.Provider>
     )
}