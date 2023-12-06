// app/page.tsx
'use client'
import { users } from "@/utils/data";
import { Pagination } from "@nextui-org/react";
import React from "react";


export default function Notifications() {
    return (
        <div className='flex lg:flex-row flex-col w-full lg:h-[85vh] shadow-md lg:w-[85vw] bg-WT rounded-lg '>
            <div className="flex flex-col w-full gap-[5vh] px-[4vw]  py-[3vh]">
                <span className="text-text text-[4vw] lg:text-[1vw] font-medium">List des notifications</span>
                <div className="flex flex-col gap-[3vh]">
                    {users.slice(0, 10).map((menu, key) => (
                        <div className="w-full h-[3.5vh] border-l-5 border-termine flex items-center justify-between pl-[1vw]" key={key}>
                            <span className="text-text text-[2.7vw] lg:text-[0.8vw] font-base">La tâche <span className="text-table text-[2.7vw] lg:text-[0.8vw] font-base"> n° 45890</span> a été fusionnée avec la tâche <span className="text-table text-[2.7vw] lg:text-[0.8vw] font-base">n° 45890</span></span>
                            <span className="text-text-mini-2 text-[2.5vw] lg:text-[0.7vw] font-base">Le Oct 4, 2023 à 01:00 </span>
                        </div>
                    ))}

                    <div className="flex w-full justify-between items-center mt-[2vh]">
                        <span className="lg:w-[30%] text-[3vw] text-small text-sub-title">Total 30 notifications
                        </span>
                        <Pagination
                            isCompact
                            showControls
                            classNames={{
                                base: "text-WT",
                                cursor:
                                    "bg-green shadow-md  text dark:from-default-300 dark:to-default-100 text-white font-bold",
                            }}
                            radius="full"
                            page={1}
                            total={3}
                            //   onChange={onPageChange}
                            variant="light"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}