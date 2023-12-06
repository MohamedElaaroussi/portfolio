"use client"
import { Providers } from "./providers";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "@/reducers/authSlice";

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (

    <html lang="en" className='light bg-BG'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}