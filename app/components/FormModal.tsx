"use client"
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import logo from "@/public/images/logo.svg"
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { User, userRegister, userSignin } from '@/redux/usersSlice'
import { AppDispatch } from '@/redux/store'
import { IsLogin, UserLoginContext } from '@/contexts/IsUserLogin'
import { useRouter } from "next/navigation";
import swal from 'sweetalert'
import { RootState } from '@reduxjs/toolkit/query'
export type FormModal = {
  formTitle: string;
  switchPage: string;
  linkHref: string;
  linkContent: string;
  formAction: (user: User) => Promise<unknown>;
};
export type FormModalProps = {
  formTitle: string;
  switchPage: string;
  linkHref: string;
  linkContent: string;
  // اکنون formAction همان نوع thunk action را برمی‌گرداند
  formAction: (user: User) => ReturnType<typeof userSignin | typeof userRegister>;
};
const FormModal: React.FC<FormModalProps> = ({ formTitle, switchPage, linkHref, linkContent, formAction }) => {
  const router = useRouter()
  const isLoginContext = useContext<UserLoginContext | null>(IsLogin)
  const loginResponse = useSelector((state: any) => state.users);
  const dispatch = useDispatch<AppDispatch>()
  const [loginFormInfo, setLoginFormInfo] = useState<User>({ email: "", password: "" })


  //form submit
  const submitLoginFormHandler = async (event: FormEvent) => {
    event.preventDefault()
    if (loginFormInfo.email !== "" && loginFormInfo.password !== "") {
      await dispatch(formAction(loginFormInfo))
    } else {
      swal({
        title: "خطا",
        text: "لطفا ایمیل و رمز عبور را وارد کنید.",
        icon: "error",
        buttons: {
          confirm: {
            text: "متوجه شدم",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        }
      });
    }
  }
  useEffect(() => {
  if (loginResponse?.users?.token) {
    isLoginContext?.setIsLogin(true);
    localStorage.setItem("isLoginStorage", JSON.stringify(isLoginContext?.isLogin));
    router.push("/");
  } else if (loginResponse?.error === "Rejected") {
    swal({
      title: "خطا",
      text: "ایمیل یا رمز عبور صحیح نمی‌باشد!",
      icon: "error",
      buttons: {
        confirm: { text: "متوجه شدم", closeModal: true }
      }
    });
  }
}, [loginResponse, router, isLoginContext])



  return (

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-10  absolute bg-slate-900 rounded-2xl  mt-10 " >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src={logo} alt='site-logo' width={200} height={200} className='mx-auto' />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          {formTitle}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium ">
              آدرس ایمیل
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setLoginFormInfo((prev) => ({ ...prev, email: e.target.value }))}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                placeholder='example@email.com'
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                رمز عبور
              </label>

            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setLoginFormInfo((prev) => ({ ...prev, password: e.target.value }))}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                placeholder='اینجا وارد کنید .'
                required
              />
            </div>
          </div>

          <div>
            <button
              onClick={(event) => submitLoginFormHandler(event)}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              ورود
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          {switchPage} {' '}
          <Link href={linkHref} className="font-semibold text-indigo-300 hover:text-indigo-500 ">
            {linkContent}
          </Link>
        </p>
      </div>
      <span dir='rtl' className='mt-5' > ایمیل و پسورد فیک API : </span>
      <span dir='ltr'> "email": "eve.holt@reqres.in",
        "password": "pistol"</span>
    </div>
  )
}

export default FormModal
