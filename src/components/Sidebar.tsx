'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { menus } from "@/utils/seed"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MenuIcons from './icons/MenuIcons'
import LogoIcon from './icons/LogoIcon'
import { SidebarIcon } from './icons/SidebarIcon'


function Sidebar({ open, handleSidebar }: { open: boolean, handleSidebar: any }) {
	let path = usePathname();
	path = path.slice(1);
	const [opens, setopens] = React.useState(open);
	const activeClassText = "text-green";
	const activeClassMenu = "bg-BG ";
	const d = new Date();
	let month = d.getMonth().toString(); ;
	let year = d.getFullYear();

	return (

		<div className={`flex flex-col items-center gap-[16vh] 2xl:gap-[18vh] h-[100vh] text-gray-400 bg-darck rounded py-[3vh] overflow-x-hidden  ${open === true ? `fixed z-50 w-full opacity-1 lg:static lg:flex lg:w-[14vw]` : ` w-0 lg:flex opacity-0 lg:opacity-100 lg:w-[5vw]`} transition-all ease-in-out  duration-700 scrollbar-hide`}>
			<div className='flex w-full lg:w-[2vw] justify-around items-center transition delay-200 duration-300 ease-in-out'>
				<div className='flex w-[6vh] lg:w-[2vw]'><LogoIcon color='white' height={50} className='object-cover' /></div>
				<div className='flex lg:hidden w-[6vw] cursor-pointer' onClick={() => {
					setopens(!open);
					handleSidebar(!open)
				}}>
					<SidebarIcon className='flex lg:hidden' color='white' />
				</div>
			</div>
			<div className="flex flex-col w-full pl-[0.5vw] ml-[10vh] md:ml-[30vw] lg:ml-[1vw] gap-[3vh] 2xl:gap-[4vh]">
				{menus.map((menu, key) => (
					<div className={`group rounded-l-3xl  ${menu.path == path || path.match(`${menu.path}+/[a-z]`) || path.match(`${menu.path}+/[0-9]`) ? activeClassMenu : ''} hover:bg-BG `} key={key}>
						<Link className="flex rounded items-center  hover:bg-gray-700 hover:text-gray-30" href={`/${menu.path}`} scroll={false} key={key}>
							{/* <Image
									src={`/${menu.path === path || path.match(`${menu.path}+/[a-z]`) ? `active-${menu.name}.svg` : `${menu.name}.svg`}`}
									width={0} // Set the desired width here
									height={0} // Set the desired height here
									className={`relative w-[3vw] h-auto`}
									alt={menu.name}
								/> */}
							<div className='w-[10vh] md:w-[10vw] 2xl:w-[3vw] h-auto '>
								<MenuIcons name={menu.name} color={menu.path === path || path.match(`${menu.path}+/[a-z]`) || path.match(`${menu.path}+/[0-9]`) ? "#0DC600" : "white"} />
							</div>
							<span className={`text-[2.5vh] lg:text-[1vw] font-medium group-hover:text-green ${menu.path === path || path.match(`${menu.path}+/[a-z]`) || path.match(`${menu.path}+/[0-9]`) ? activeClassText : 'text-WT'} ${open ? `opacity-1` : `opacity-0`}`}>{menu.name}</span>
						</Link>
					</div>
				))}

			</div>

			<div className={`group w-full ml-[14vh] md:ml-[34vw] lg:ml-[2vw] px-[3vw] lg:px-[1vw] py-[1vh] lg:py-[0.5vw] rounded-l-3xl justify-start ${"settings" === path ? activeClassMenu : ''} hover:bg-WT `}>

				<Link className="flex rounded items-center justify-start hover:bg-gray-700 hover:text-gray-30 gap-[0.6vw]" href="/settings" scroll={false}>
					{/* <Image
						src={"/settings.svg"}
						width={0}
						height={0}
						className={` w-[3.5vh] h-auto`} // optional
						alt="settings"	
					/>	 */}
					<div className=" w-[7vh] md:w-[4vh] 2xl:w-[3.5vh] h-auto">
						<MenuIcons name='settings' color={"settings" === path ? "#0DC600" : "white"} className='group-hover:stroke-green' />
					</div>
					<span className={`text-[2.5vh] lg:text-[1vw] font-medium group-hover:text-green ${"settings" === path ? activeClassText : 'text-WT'} ${open ? `opacity-1` : `opacity-0`}`}>settings</span>
				</Link>
			</div>
		</div>

	)
}

export default Sidebar