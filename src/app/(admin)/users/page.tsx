// app/page.tsx
'use client'
import { fetchUsers } from "@/actions/userActions"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import UsersList from "@/components/phone_tables/UsersList"
import TableOfUsers from "@/components/tables/TableOfUsers"
import { selectAuth } from "@/reducers/authSlice"
import { selectusers, setFilters, setPagination } from "@/reducers/userSlice"
import { paths } from "@/utils/seed"
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"

export default function Page() {
  const path = "Gestion des utilisateurs";
  const [open, setopen] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const{users, filters, pagination,loading,totalItems } = useSelector(selectusers);
  const router =useRouter()
  const isAuthenticated = useSelector(selectAuth);
  // Delete items from the database
  useEffect(() => {
    const fetchData = async () => {
      try {

        await dispatch(fetchUsers(filters, pagination));
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    if (!isAuthenticated) {
      router.push('/login');
    }
    fetchData();
  }, [dispatch, filters, pagination,router]);

  console.log(users)
  const handleFilterChange = (newFilters:any) => {
    dispatch(setFilters(newFilters));
    dispatch(setPagination({ ...pagination, page: 1 }));
  };

  const handlePageChange = (newPage:number) => {
    dispatch(setPagination({ ...pagination, page: newPage }));
  };
  const handleSizeChange = (event:any) => {
    dispatch(setPagination({ ...pagination, pageSize: event.target.value }));
  };
  const handleSidebar = (bool: boolean) => {
    setopen(bool);
  };
  return (
    <div className='flex h-max w-screen bg-BG'>
      <div className={`hidden ${open ? ` lg:flex lg:w-[14vw]` : `w-full lg:flex lg:w-[5vw]`} transition-all`} />
      <div className="fixed z-30 h-[100vh]">
        <Sidebar open={open} handleSidebar={handleSidebar}/>
      </div>

      <div className="flex flex-col w-full h-max items-center gap-[4vh] overflow-scroll-y">
        <div className={`w-full fixed z-20 ${!open ? 'lg:pl-[2.5vw]' : 'lg:pl-[7.5vw]'} transition-all`}>
          <Navbar open={open} name={path} handleSidebar={handleSidebar} />
        </div>
        <div className="h-[9vh] lg:h-[11vh] z-10"></div>
        <div className="flex lg:hidden"><UsersList  utilisateurs={users} loading={loading} totalItems={totalItems} onPageChange={handlePageChange} onFilterChange={handleFilterChange} onSizeChange={handleSizeChange} pagination={pagination} filters={filters}/></div>
        <div className="hidden lg:flex">
          <TableOfUsers utilisateurs={users} loading={loading} totalItems={totalItems} onPageChange={handlePageChange} onFilterChange={handleFilterChange} onSizeChange={handleSizeChange} pagination={pagination} filters={filters}/>
        </div>
      </div>

    </div>
  )
}