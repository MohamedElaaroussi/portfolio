// app/page.tsx
'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import MatchDetails from "@/components/item_details/MatchDetails"
import { Avatar, AvatarGroup, Button, Input, Progress, Select, SelectItem, Textarea } from "@nextui-org/react"

import { useState } from "react"
import { dates, months } from "@/utils/data"
import { SelectIcon } from "./icons/SelectIcon"
import Link from "next/link"


const themes = [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
]

export default function MonthFilter({ name, month, year }: { name: string, month: string, year: string }) {
    // alert()
    const [value, setValue] = useState(60);
    const [day, setDay] = useState<number | null>(0);
    const [all, setAll] = useState<boolean>(false);
    return (
        <div className="bg-WT w-[90vw] lg:w-[60vw] flex p-[2.5vw] lg:p-[0.5vw] rounded-md shadow-lg lg:shadow-none  overflow-x-auto scrollbar-hide">

            <div className="flex w-full gap-[4vw] lg:gap-0 lg:justify-between items-center ">
                {months.map((date, key) => (
                    <Link href={`/${name}/${date.num}/${year}`} key={key} >   
                     <div className={`${month === date.num && "bg-green lg:p-[0.7vw]"} group p-[1vh] lg:p-[0.5vw] rounded-full cursor-pointer hover:bg-green`}><div className="flex flex-col items-center lg:w-[1.4vw] "><span className={`${month === date.num ? "text-WT lg:text-[1vw]" : "text-sub-title"} font-medium text-[3vw]  lg:text-[0.8vw] group-hover:text-WT`} >{date.month}</span><span className={`${date.num === month && "text-WT lg:text-[1vw]"} font-medium text-[3vw] lg:text-[0.8vw] group-hover:text-WT`} >{date.num}</span></div>
                    </div>
                    </Link>
                ))}
                <div className={`${all === true && "bg-green lg:p-[0.7vw]"} group p-[0.5vw] rounded-full cursor-pointer hover:bg-green`} onClick={() => {
                    setAll(true)
                    setDay(null)
                }}><div className="flex flex-col items-center w-[1.4vw] "><span className={`${all === true ? "text-WT lg:text-[1vw]" : "text-sub-title"} font-medium text-[3vw] lg:text-[0.8vw] group-hover:text-WT`} >all</span></div>
                </div>
                <Button
                    variant="flat"
                    endContent={<SelectIcon className="text-sub-title" color="rgba(181, 181, 195, 1)" />}
                    className="flex w-[3vw] rounded-md items-center justify-center hover:bg-darck"
                >
                    <span className="text-sub-title font-medium">{year}</span>
                </Button>
            </div>
        </div>
    )
}