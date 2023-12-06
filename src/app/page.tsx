// app/page.tsx
'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from 'next/navigation'
import { useSelector } from "react-redux";
import { selectAuth } from "@/reducers/authSlice";

export default function Page() {
  const isAuthenticated = useSelector(selectAuth);
   const router = useRouter()
   useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
    }else{
      router.push('/dashboard');
    }
  }, [isAuthenticated,router]);

return(<></>)
  
}