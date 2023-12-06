// app/page.tsx
'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import OrderDetails from "@/components/item_details/OrderDetails"
import { useEffect ,useState} from 'react';
import { useRouter } from 'next/navigation';
import { selectAuth, selectAuthLoading } from "@/reducers/authSlice";
import { useSelector } from "react-redux";


export default function Page() {
  const path = "Gestion des commandes";
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
      <Sidebar open={open} handleSidebar={handleSidebar}/>
      <div className="flex flex-col w-full items-center gap-[13vh] lg:gap-0">
       <div className="fixed lg:static z-40 h-[9vh] w-full"><Navbar open={open} name={path} handleSidebar={handleSidebar}/></div> 
       <div className="h-[9vh] z-10"></div>
      <OrderDetails />
      </div>
    </div>
  )
}