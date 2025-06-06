"use client"
import React from 'react'
import { userRegister } from '@/redux/usersSlice'
import FormModal from '../components/FormModal'
const RegisterPage = () => {
  return (
    <div className='relative flex justify-center'>
      <FormModal formTitle={"فرم ثبت نام"}
        switchPage={"قبلا ثبت نام کرده اید ؟"}
        linkHref={"/login"}
        linkContent={"فرم ورود"} 
       formAction = {userRegister}
        />

    </div>
  )
}

export default RegisterPage
