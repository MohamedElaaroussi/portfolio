// app/page.tsx
'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import TableOfMatches from "@/components/tables/TableOfMatches"
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import MonthFilter from "@/components/MonthFilter";
import MatchesList from "@/components/phone_tables/MatchesList";
import { useDispatch, useSelector } from "react-redux";
import { selectmatches,setMatches, setFilters, setPagination, setSearch  } from "@/reducers/matchSlice";
import { fetchHosts, fetchMatches } from "@/actions/matchActions";
import { selectAuth } from "@/reducers/authSlice";
import { selectPlayers } from "@/reducers/playerSlice";


export default function Page() {
  const path = "Gestion des matches";
  const [open, setopen] = useState<boolean>(false);
  const router =useRouter()
  const dispatch = useDispatch<any>();
  const { matches, filters,search, pagination,loading,totalItems,hosts } = useSelector(selectmatches);
  const isAuthenticated = useSelector(selectAuth);

  // const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';


  useEffect(() => {
    const fetchData =  () => {
      try {

         dispatch(fetchMatches(filters,pagination,search));
         dispatch(fetchHosts());
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
    }

    fetchData();

  }, [dispatch, filters,search, pagination,isAuthenticated,router]);


  const handleFilterChange = (newFilters:any) => {
    dispatch(setFilters(newFilters));
    dispatch(setPagination({ ...pagination, page: 1 }));
  };


  const handlePageChange = (newPage:number) => {
    dispatch(setPagination({ ...pagination, page: newPage }));
  };
  const handleSizeChange = (event:any) => {
    dispatch(setPagination({ ...pagination, pageSize:event.target.value,page:1 }));
  };
  
  const handleSidebar = (bool:boolean) => {
		setopen(bool);
	};
  return (
    <div className='flex h-max w-screen bg-BG'>
              <div className={`hidden ${open ? ` lg:flex lg:w-[14vw]` : `w-full lg:flex lg:w-[5vw]`} transition-all`}/>
              <div className="fixed z-30 h-[100vh]">
              <Sidebar open={open} handleSidebar={handleSidebar}/>
              </div>

      <div className="flex flex-col w-full h-max items-center gap-[4vh] overflow-scroll-y">
        <div className={`w-full fixed z-20 ${!open ? 'lg:pl-[2.5vw]':'lg:pl-[7.5vw]'} transition-all`}>
          <Navbar open={open} name={path} handleSidebar={handleSidebar} />
        </div>
        <div className="h-[9vh] lg:h-[11vh] z-10"></div>
        <div className="flex lg:hidden"><MatchesList search={search} hosts={hosts} matches={matches} loading={loading} totalItems={totalItems} onPageChange={handlePageChange} onFilterChange={handleFilterChange} onSizeChange={handleSizeChange} pagination={pagination} filters={filters}/></div>
        <div className="hidden lg:flex">
          <TableOfMatches hosts={hosts} matches={matches} loading={loading} totalItems={totalItems} search={search} onPageChange={handlePageChange} onFilterChange={handleFilterChange} onSizeChange={handleSizeChange} pagination={pagination} filters={filters}/>
        </div>

      </div>

    </div>
  )
}