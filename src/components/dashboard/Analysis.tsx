// app/page.tsx
'use client'
import { Avatar, AvatarGroup, Progress } from "@nextui-org/react"
import { useState } from "react"
import { dates } from "@/utils/data"
import { ProfitIcon } from "../icons/ProfitIcon"
import Profit from "./Profit"


export default function Analysis() {
    const [value, setValue] = useState(60);
    const [day, setDay] = useState(0);
    return (
        <div className='flex lg:h-[85vh] lg:w-[85vw] justify-end'>
            <div className="flex flex-col gap-[4vh] ">
                <div className="flex flex-col lg:flex-row gap-[3vh] lg:gap-[2vw] lg:h-[25vh]">
                    <div className="bg-darck lg:w-[25vw] h-full flex flex-col items-start px-[5vw] py-[2vh] lg:py-0 lg:px-[1vw] gap-[3vh] lg:gap-[3vh] rounded-xl shadow-lg bg-[url('/matches.svg')] bg-no-repeat bg-cover bg-right-bottom">
                        <div className="flex flex-col">
                            <div className="flex items-end lg:gap-[0.2vw]">
                                <span className="text-green font-medium text-[6vw] lg:text-[2.5vw]">40</span>
                                <span className="text-sub-title font-medium text-[4vw] lg:text-[1.3vw]">/241</span>
                            </div> 
                            <span className="text-sub-title font-base lg:text-[0.8vw]"> Matches du mois</span>
                        </div>
                        <Progress
                            aria-label="Downloading..."
                            size="md"
                            value={value}
                            color="success"
                            classNames={{
                                base: "max-w-md",
                                track: "bg-text-mini-2",
                                indicator: "bg-green",
                                value: "text-WT",
                            }}
                            showValueLabel={true}

                        />
                    </div>
                    <div className="bg-WT lg:w-[25vw] shadow-lg h-full flex flex-col items-start px-[5vw] py-[3vh] lg:py-0 lg:px-[1vw] gap-[3vh] lg:gap-[5vh] rounded-xl shadow-lg bg-[url('/players.svg')] bg-cover bg-right">
                        <div className="flex flex-col">
                            <span className="text-gray-400 font-medium text-[6vw] lg:text-[2.5vw]">50</span>
                            <span className="text-sub-title font-medium text-[4vw] lg:text-[0.8vw]">Nombre du joueurs</span>
                        </div>
                        <AvatarGroup isBordered>
                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                        </AvatarGroup>
                    </div>
                    <div className="bg-WT lg:w-[25vw] flex flex-col items-start rounded-xl shadow-lg p-[5vw] lg:px-[2vw] lg:py-[0.7vw]">
                        <div className="flex items-center gap-[2vw] lg:gap-[0.5vw]">
                           <ProfitIcon/>
                           <span className="font-medium text-[5vw] lg:text-[1.5vw] text-darck">20,000</span>
                           <span className="font-medium text-[3vw] lg:text-[0.9vw] text-darck">DH</span>
                        </div>
                        <span className="font-medium text-[4vw] lg:text-[1vw] text-sub-title">Total profit</span>
                       {/* <Profit/>  */}
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-[2vw] lg:h-[56vh]">
                    <div className="bg-WT lg:w-[50vw] rounded-xl shadow-lg">
                        {/* <PlayerStastitics/> */}
                        </div>
                    <div className="bg-WT lg:w-[27vw] flex flex-col p-[5vw] lg:p-[1.5vw] gap-[1.5vh] rounded-xl shadow-lg">
                        <div className="flex flex-col">
                         <span className="text-darck font-medium text-[4.5vw] lg:text-[1vw]">Les matches du jour</span>
                         <span className="text-sub-title font-medium text-[3.5vw] lg:text-[0.8vw]">Total: 20 matches</span>
                        </div>
                        <div className="flex lg:gap-[1.2vw] justify-between">
                        {dates.map((date,key) => (
                            <div key={key} className={`${day===key && "bg-green"} p-[2vw] lg:p-[0.5vw] rounded-full cursor-pointer`} onClick={()=>setDay(key)}><div className="flex flex-col items-center w-[4vw] lg:w-[1.4vw] "><span className={`${day===key ? "text-WT":"text-sub-title"} font-medium text-[3vw] lg:text-[0.8vw]`} >{date.jour}</span><span className={`${day===key && "text-WT"} font-medium text-[3vw] lg:text-[0.8vw]`} >{date.num}</span></div></div>
                        ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}