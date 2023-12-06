// app/page.tsx
'use client'
import { selectMatchById } from "@/actions/matchActions"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import MatchDetails from "@/components/item_details/MatchDetails"
import { selectAuth } from "@/reducers/authSlice"
import {  selectmatches } from "@/reducers/matchSlice"
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation"
import { useEffect ,useState} from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Page({params}:{params:{id:string}}) {
  const path = "Gestion des matches";
  const router = useRouter()
  const dispatch = useDispatch<any>();
  const [open, setopen] = useState<boolean>(false);
  const isAuthenticated = useSelector(selectAuth);
  const { matches } = useSelector(selectmatches);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(selectMatchById(params.id));
        // await dispatch(fetchMatches(filters, pagination,search));
        
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    if(!isAuthenticated){
      router.push('/login')
    }
    fetchData();
  }, [dispatch,params,isAuthenticated,router]);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const handleSidebar = (bool:boolean) => {
		setopen(bool);
	};
  return (
    <div className='flex h-screen w-screen bg-BG'>
      <Sidebar open={open} handleSidebar={handleSidebar}/>
      <div className="flex flex-col w-full items-center gap-[9vh] lg:gap-0">
       <div className="fixed lg:static z-40 h-[9vh] w-full"><Navbar open={open} name={path} handleSidebar={handleSidebar}/></div> 
       <div className=" lg:h-[9vh] z-10"></div>
      <MatchDetails match={matches} />
      </div>
    </div>
  )
}