import Link from 'next/link'
import React from 'react'

const Page404 = () => {
    return (
        <div className='flex justify-center items-center flex-col h-dvh gap-5 font-bold'>
            <h1 className='text-2xl'>صفحه مورد نظر یافت نشد !! </h1>
            <h4 className='text-25px'>کد خطا  : 404</h4>
            <Link href={"/"} className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
            text-sm/6 font-semibold text-white shadow-xs
             hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600 cursor-pointer btn__404'>بازگشت به صفحه اصلی</Link>
        </div>
    )
}

export default Page404
