import * as React from 'react';
import { Users } from './components/Users';

export default async  function Home() {
  return (
    <>
      <header className="mt-10 text-center text-5xl font-bold  mb-10 ">لیست کاربران</header>
      <main className="flex flex-row flex-nowrap content-between justify-center">
       <Users/> 
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <h3>ساخته شده توسط محمد آقائی</h3>
      
      </footer>
    </>
  );
}
