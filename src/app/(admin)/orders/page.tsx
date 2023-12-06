// app/page.tsx
'use client'
import { fetchOrders } from "@/actions/orderActions"
import MonthFilter from "@/components/MonthFilter"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import OrdersList from "@/components/phone_tables/OrderList"
import TableOfOrders from "@/components/tables/TableOfOrders"
import { selectAuth } from "@/reducers/authSlice"
import {  selectorders, setFilters, setPagination } from "@/reducers/orderSlice"
import { paths } from "@/utils/seed"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"

export default function Page() {
  const path = "Gestions des commandes";
  const [open, setopen] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const {orders, filters, pagination,loading,totalItems} = useSelector(selectorders);
  const router =useRouter()

  const isAuthenticated = useSelector(selectAuth);
  // const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);


  useEffect(() => {
    const fetchData = async () => {
      try {

        await dispatch(fetchOrders(filters, pagination));
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
    }
    fetchData();
  }, [dispatch, filters, pagination,isAuthenticated,router]);


  const handleFilterChange = (newFilters:any) => {
    dispatch(setFilters(newFilters));
    dispatch(setPagination({ ...pagination, page: 1 }));
  };

  const handlePageChange = (newPage:number) => {
    dispatch(setPagination({ ...pagination, page: newPage }));
  };
  const handleSizeChange = (event:any) => {
    dispatch(setPagination({ ...pagination, pageSize: event.target.value}));
  };
  
  
  const handleSidebar = (bool: boolean) => {
    setopen(bool);
  };
  return (
    <div className='flex h-max w-screen bg-BG'>
      <div className={`hidden ${open ? `hidden lg:flex lg:w-[14vw]` : `w-full lg:flex lg:w-[5vw]`} transition-all`} />
      <div className="fixed z-30 h-[100vh]">
        <Sidebar open={open} handleSidebar={handleSidebar}/>
      </div>

      <div className="flex flex-col w-full h-max items-center gap-[4vh] overflow-scroll-y">
        <div className={`w-full fixed z-20 ${!open ? 'lg:pl-[2.5vw]' : 'lg:pl-[7.5vw]'} transition-all`}>
          <Navbar open={open} name={path} handleSidebar={handleSidebar} />
        </div>
        <div className="h-[9vh] lg:h-[11vh] z-10"></div>
        <div className="flex lg:hidden"><OrdersList  orders={orders} loading={loading} totalItems={totalItems} onPageChange={handlePageChange} onFilterChange={handleFilterChange} onSizeChange={handleSizeChange} pagination={pagination} filters={filters}/></div>
        <div className="hidden lg:flex">
          <TableOfOrders orders={orders} loading={loading} totalItems={totalItems} onPageChange={handlePageChange} onFilterChange={handleFilterChange} onSizeChange={handleSizeChange} pagination={pagination} filters={filters}/>
        </div>
      </div>

    </div>
  )
}