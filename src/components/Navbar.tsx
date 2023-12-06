import { Input, User, DropdownTrigger, Dropdown, DropdownItem, DropdownMenu } from '@nextui-org/react'
import React from 'react'
import { SearchIcon } from './icons/SearchIcon'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SidebarIcon } from './icons/SidebarIcon';
import { NotificationIcon } from './icons/NotificationIcon';
import LogoIcon from './icons/LogoIcon';
import { logout } from '@/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/reducers/authSlice';

function Navbar({open, name, handleSidebar }: {open:boolean, name: string, handleSidebar: any }) {
    const dispatch = useDispatch<any>();
    const [opens, setopens] = React.useState(open);
    const [page, setPage] = React.useState(1);
    const user = useSelector(selectUser);
    const [filterValue, setFilterValue] = React.useState("");
    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])
    const SignOut = () => {
        dispatch(logout())
        
    }
    return (
        <div className='flex h-[9vh] lg:h-[11vh] w-[100%] items-center justify-between bg-WT pr-[4vw] lg:pl-[1vw] shadow-lg '>
            <div className='flex  items-center gap-[3vh] lg:gap-0' >
            <div className='flex h-[9vh] items-center lg:hidden cursor-pointer bg-darck px-[2vw]'>
                    <LogoIcon width={40} height={40} color='white'/>
                </div>
                <div className='flex w-[6vw] lg:w-[3vw] cursor-pointer ' onClick={() => {
                    setopens(!open);
                    handleSidebar(!open)
                }} >
                    <SidebarIcon className='object-cover' color='black'/>
                </div>
                <h1 className='hidden lg:flex text-[1.4vw] font-bold ml-[0.6vw]'>{name}</h1>
            </div>
            <div className='flex gap-[2vh] lg:gap-[0.8vw] items-center'>
                <Input
                    isClearable
                    className="hidden lg:flex w-[18vw] sm:max-w-[20vw] h-auto"
                    placeholder="Rechercher par nom..."
                    classNames={{
                        base: "bg-search ",
                        inputWrapper: "h-[2.5vw] text-sub-title rounded-lg border-none hover:!bg-search ",
                        label: "text-[0.8vw] text-default-500 font-medium px-7 ",
                        input: "rounded-none text-default-500 bg-search px-7"
                    }}

                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />
                <div className='flex ml-[1.2vw] h-full w-7 items-center'>
                    <Link className="flex items-center w-[3vh] lg:w-[1.2vw]" href="/notifications">
                    <NotificationIcon className='object-cover'/>
                    </Link>
                    <div className="w-[2.5vh] h-[2.5vh] lg:w-[1vw] lg:h-[1vw] flex items-center justify-start bg-green relative bottom-[1.5vh] right-[0.9vh] pr-[0.2vh] lg:bottom-[0.6vw] lg:right-[0.4vw] lg:pr-[0.2vw] rounded-full"><span className='font-bold text-WT text-[1.5vh] lg:text-[0.6vw]'>+4</span></div>
                </div>
                <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                        <User
                            as="button"
                            avatarProps={{
                                isBordered: true,
                                src: "/profile.svg",
                            }}
                            className="transition-transform w-[6vh] lg:w-auto"
                            description={user && user.email}
                            name={user && user.username}
                            classNames={{
                                wrapper:"hidden lg:flex"
                            }}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-bold">Connecte par</p>
                            <p className="font-bold">{user && user.email}</p>
                        </DropdownItem>
                        <DropdownItem key="profile">Profile</DropdownItem>

                        <DropdownItem key="analytics">
                            Analyses
                        </DropdownItem>

                        <DropdownItem key="settings">
                            Parametres
                        </DropdownItem>
                        <DropdownItem key="help_and_feedback">
                            Aide
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={SignOut}>
                            Deconnexion
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </div>
        </div>
    )
}

export default Navbar