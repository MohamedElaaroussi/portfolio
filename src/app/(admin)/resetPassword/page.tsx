"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik'; // Import Formik components
import { Input, Checkbox, Button } from "@nextui-org/react";
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LogoIcon from '@/components/icons/LogoIcon';
import { MailIcon } from '@/components/icons/MailIcon';


export default function Page() {
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed

  const [error, setError] = useState(null);

  const initialValues = {
    email: "",
  };

  const onSubmit = async (values: any) => {
    setError(null);

    try {

    } catch (error: any) {
      setError(error.message);
    }
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
      {error === "Firebase: Error (auth/invalid-login-credentials)." &&
        <span className='xl:text-errer font-medium'>Email ou mot de passe est incorrect</span>}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        className='xl:w-[40vw]'
      >
        <Form className='flex flex-col gap-[4vh] w-[75vw] mt-[8vh] xl:gap-[4vh] xl:w-[25vw] xl:mt-[5vw] items-center'>
          <Field
            as={Input}
            type="email"
            label="Email"
            variant="bordered"
            endContent={<MailIcon />}  
            classNames={{
              base: "bg-WT rounded-none ",
              inputWrapper: "xl:h-[4vw] h-[10vh] rounded-none border-none",
              label:"xl:text-[0.8vw] text-[2vh] text-text-mini-2 font-medium px-7",
              input:"rounded-none px-7 text-[2vh]"
            }}
            name="email"
            required
          />

       
          <Button className='w-[75vw] h-[10vh] xl:w-[25vw] xl:h-[3vw] bg-green rounded-none' type="submit"><span className='text-WT text-[2vh] font-medium xl:text-[0.8vw]'>Continuer</span></Button>
        </Form>
      </Formik>
      </div>
    </div>
  </div>
   
  )
}
