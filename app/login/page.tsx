"use client"
import React from 'react'
import { userSignin } from '@/redux/usersSlice'
import FormModal from '../components/FormModal'


const LoginPage = () => {
 

  return (
    <div className='relative flex justify-center'>
     <FormModal formAction = {userSignin} formTitle = {"ورود به حساب کاربری"} switchPage = {" حساب کاربری ندارید ؟ "} linkHref = {"/register"} linkContent = {"ثبت نام کنید"} /> 
   
    </div>
  )
}

export default LoginPage
