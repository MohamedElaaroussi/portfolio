// app/page.tsx
'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import PlayerDetails from "@/components/item_details/PlayerDetails"
import { selectAuth } from "@/reducers/authSlice";
import { useRouter } from "next/navigation";
import {useEffect, useState} from 'react';
import { useSelector } from "react-redux";

export default function Page() {
  const path = "Gestion des joueurs";
  const [open, setopen] = useState<boolean>(false);
  const isAuthenticated = useSelector(selectAuth);
  const router =useRouter()
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
      <div className="z-50">
        <Sidebar open={open} handleSidebar={handleSidebar}/>
        </div>
 
      <div className="flex flex-col w-full items-center gap-[9vh] lg:gap-0">
       <div className="fixed lg:static z-40 h-[9vh] w-full"><Navbar open={open} name={path} handleSidebar={handleSidebar}/></div> 
       <div className=" lg:h-[9vh] z-10"></div>
      <PlayerDetails />
      </div>
    </div>
  )
}