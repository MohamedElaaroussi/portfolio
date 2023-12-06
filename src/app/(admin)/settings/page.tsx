// app/page.tsx
'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Settings from "@/components/settings/Settings"
import { selectAuth } from "@/reducers/authSlice";
import { useRouter } from "next/navigation";
import {useEffect, useState} from 'react';
import { useSelector } from "react-redux";

export default function Page() {
  const path = "Parameters";
  const [open, setopen] = useState<boolean>(false);
  const router = useRouter();
  const isAuthenticated = useSelector(selectAuth);
  const handleSidebar = (bool:boolean) => {
		setopen(bool);
	};
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated,router]);
  return (
    <div className='flex h-screen w-screen bg-BG'>
      <Sidebar open={open} handleSidebar={handleSidebar}/>
      <div className="flex flex-col w-full items-center gap-5">
      <Navbar open={open} name={path} handleSidebar={handleSidebar}/>  
      <Settings />
      </div>
      
    </div>
  )
}