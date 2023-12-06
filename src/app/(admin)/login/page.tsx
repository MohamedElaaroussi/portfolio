"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik'; // Import Formik components
import { Input, Checkbox, Button } from "@nextui-org/react";
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EyeSlashFilledIcon } from '@/components/icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '@/components/icons/EyeFilledIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import { loginUser } from '@/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, selectAuthLoading } from '@/reducers/authSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from '@/components/Spinner';

export default function Page() {
  const dispatch = useDispatch<any>();
  const authError = useSelector((state: any) => state.auth.error);
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const isAuthenticated = useSelector(selectAuth);
  const loading = useSelector(selectAuthLoading);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Listen for changes on loading and authUser, redirect if needed

  const [error, setError] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };
  // const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated,router]);


  const onSubmit =  (values: any) => {

      dispatch(loginUser(values.email, values.password));
 
  };


  return (
    <div className='bg-BG flex w-[100vw] h-[100vh] items-center justify-center xl:m-0 xl:gap-4  '>
      <div className='flex justify-center items-center'>

      <Image
        src={'/login.svg'}
        width={0}
        height={0}
        alt='login'
        className='hidden xl:flex object-cover w-[40vw] h-[100vh] rounded-r-[80px]'
        />
      
      <div className='flex justify-center flex-col gap-[5vh] xl:w-[60vw] items-center'>
        <div className='flex  xl:w-[20vw] gap-4 items-center xl:justify-start'>
        {/* <Image
          src={'/logo.svg'}
          width={0}
          height={0}
          alt='logo'
          className='xl:w-[8vw] h-[8vw]'
        /> */}
        <div className='w-[9vh] flex xl:w-[5vw]'><LogoIcon color='rgba(17, 19, 66, 1)' className='object-cover '/></div>
       
				
        <span className='hidden xl:flex text-[5vh] font-bold leading-[5vh] w-[1vw] xl:font-bold xl:text-[2vw] text-darck xl:leading-[2vw] xl:mt-[1.1vw] xl:w-7'>FOOT COMMUNITY</span>
        </div>
        <span className='font-bold text-[3vh] xl:text-[1.2vw] text-darck'>Se connecter</span>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          className='xl:w-[40vw]'
        >
          <Form className='flex flex-col gap-[4vh] w-[75vw]  xl:gap-[4vh] xl:w-[25vw] items-center'>
            <Field
              as={Input}
              type="email"
              label="Email"
              variant="bordered"
              
              classNames={{
                base: "bg-WT rounded-none ",
                inputWrapper: "xl:h-[4vw] h-[10vh] rounded-none border-none",
                label:"xl:text-[0.8vw] text-[2vh] text-text-mini-2 font-medium px-7",
                input:"rounded-none px-7 text-[2vh]"
              }}
              name="email"
              required
            />

            <Field
              as={Input}
              label="Mot de passe"
              variant="bordered"
              required
              name="password"
              classNames={{
                base: "bg-WT rounded-none",
                label:"xl:text-[0.8vw] text-[2vh] text-text-mini-2 font-medium",
                inputWrapper: "xl:h-[4vw] h-[10vh] rounded-none border-none px-7",
                input:"rounded-none autofill:bg-green px-7"
              }}
              endContent={
                <button className="xl:focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className="xl:text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="xl:text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />

            <div className='flex w-full justify-between items-center'>
              <Checkbox defaultChecked size="sm" name="rememberMe" className=''><span className='xl:text-sub-title text-[1.5vh] xl:text-[0.75vw]'>Se souvenir de moi</span></Checkbox>
              <Link href={'/resetPassword'} className='font-medium text-darck text-[1.5vh] xl:text-[0.75vw]'>Mot de passe oublié</Link>
            </div>

            <Button className='w-[75vw] h-[10vh] xl:w-[25vw] xl:h-[3vw] bg-green rounded-none' type="submit">{loading ?<Spinner color="WT"/>:<span className='text-WT text-[2vh] font-medium xl:text-[0.8vw]'> Se connecter</span>}</Button>
          </Form>
        </Formik>
        <ToastContainer/>
        </div>
      </div>
    </div>

  )
}
