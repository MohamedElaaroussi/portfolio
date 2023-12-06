// app/page.tsx
'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Analysis from "@/components/dashboard/Analysis";

import { useEffect ,useState} from 'react';
import { useRouter } from 'next/navigation';
import { selectAuth, selectAuthLoading } from "@/reducers/authSlice";
import { useSelector } from "react-redux";

export default function Page() {
  const path = "Dashboard";
  const router = useRouter();
  const [open, setopen] = useState<boolean>(false);
  const isAuthenticated = useSelector(selectAuth);
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated,router]);

	const handleSidebar = (bool:boolean) => {
		setopen(bool);
	};
  return (
  <div className='flex h-screen w-screen bg-BG '>
    <Sidebar open={open} handleSidebar={handleSidebar}/>
    <div className="flex flex-col w-full items-center gap-5">
    <Navbar name={path} open={open} handleSidebar={handleSidebar} />  
    <Analysis/>
    </div>
    
  </div>
  )
}