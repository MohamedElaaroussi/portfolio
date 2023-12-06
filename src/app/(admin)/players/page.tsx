// app/page.tsx
"use client"
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TableOfPlayers from "@/components/tables/TableOfPlayers";
import { collection, addDoc, getDocs, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import PlayersList from "@/components/phone_tables/PlayersList";
import MonthFilter from "@/components/MonthFilter";
import { fetchPlayers } from "@/actions/playerActions";
import { selectPlayers, setFilters, setPagination } from "@/reducers/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/reducers/authSlice";
import {  useRouter } from 'next/navigation'



export default function Page() {
  const [open, setopen] = useState<boolean>(false);
  const path = "Gestion des joueurs";
  const dispatch = useDispatch<any>();
  const { players, filters, pagination,loading,totalItems } = useSelector(selectPlayers);
  const router =useRouter()
  const isAuthenticated = useSelector(selectAuth);

  useEffect(() => {
    const fetchData = async () => {
      try {

        await dispatch(fetchPlayers(filters, pagination));
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
    dispatch(setPagination({ ...pagination, pageSize: event.target.value }));
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
        <div className="flex lg:hidden"><PlayersList  players={players} loading={loading} totalItems={totalItems} onPageChange={handlePageChange} onFilterChange={handleFilterChange} onSizeChange={handleSizeChange} pagination={pagination} filters={filters}/></div>
        <div className="hidden lg:flex">
          <TableOfPlayers players={players} loading={loading} totalItems={totalItems} onPageChange={handlePageChange} onFilterChange={handleFilterChange} onSizeChange={handleSizeChange} pagination={pagination} filters={filters}/> {/* Pass the deleteItem function to the TableOfPlayers component */}
        </div>
      </div>
    </div>
  );
}
