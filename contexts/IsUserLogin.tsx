"use client"
import React, { FC,useState} from 'react'
import { createContext } from 'react';
interface IsUserLoginProps {
  children : React.ReactNode
}
 export interface UserLoginContext {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IsLogin = createContext<UserLoginContext | null>(null)

const IsUserLogin  : FC<IsUserLoginProps> = ({children}) => {
  const [isLogin,setIsLogin]  =  useState<boolean>(false)
  return (
    <IsLogin.Provider value ={{isLogin ,setIsLogin}}>
      {children}
    </IsLogin.Provider >
  )
}

export default IsUserLogin

