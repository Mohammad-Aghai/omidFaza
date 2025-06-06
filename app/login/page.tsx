"use client"
import React from 'react'
import { useContext } from 'react'
import { IsLogin } from '@/contexts/IsUserLogin'
import { UserLoginContext } from '@/contexts/IsUserLogin'
import { userSignin } from '@/redux/usersSlice'
import FormModal from '../components/FormModal'


const LoginPage = () => {
  const isLogin = useContext<UserLoginContext | null>(IsLogin)


  return (
    <div className='relative flex justify-center'>
     <FormModal formAction = {userSignin} formTitle = {"ورود به حساب کاربری"} switchPage = {" حساب کاربری ندارید ؟ "} linkHref = {"/register"} linkContent = {"ثبت نام کنید"} /> 
   
    </div>
  )
}

export default LoginPage
