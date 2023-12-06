// app/page.tsx
'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import PlayerDetails from "@/components/item_details/PlayerDetails"
import UserDetails from "@/components/item_details/UserDetails";
import { useState } from 'react';

export default function Page() {
  const path = "Gestion des joueurs";
  const [open, setopen] = useState<boolean>(false);
  const handleSidebar = (bool: boolean) => {
    setopen(bool);
  };
  return (
    <div className='flex h-max w-screen bg-BG'>
      <div className={`hidden ${open ? ` lg:flex lg:w-[14vw]` : `w-full lg:flex lg:w-[5vw]`} transition-all`} />
      <div className="fixed z-30 h-[100vh]">
        <Sidebar open={open} handleSidebar={handleSidebar} />
      </div>
      <div className="flex flex-col w-full h-max items-center overflow-scroll-y">
        <div className={`w-full fixed z-20 ${!open ? 'lg:pl-[2.5vw]' : 'lg:pl-[7.5vw]'} transition-all`}>
          <Navbar open={open} name={path} handleSidebar={handleSidebar} />
        </div>
        <div className="h-[9vh] z-10"></div>
        <UserDetails />
      </div>
    </div>
  )
}