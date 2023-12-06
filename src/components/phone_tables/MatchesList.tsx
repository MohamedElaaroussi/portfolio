import React from "react";
import {
    Input,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    User,
    Tooltip,
    Pagination,
    Selection,
    SortDescriptor,
    AvatarGroup,
    Avatar
} from "@nextui-org/react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { statusOptions,matchcolumns } from "../../utils/data";
import { capitalize, getMonthName } from "../../utils/utils";
import { useDisclosure } from "@nextui-org/react";
import Link from "next/link"
import ExportIcon from "../icons/ExportIcon";
import MatchFilter from "../modals/MatchFilter";
import Actions from "../dropdowns/Actions";
import Image from "next/image";
import { Spinner } from "../Spinner";
import AddMatch from "../add_item/AddMatch";
import { exportCSV, exportPDF } from "@/utils/export";
import { statusColorMap } from "@/utils/statusColorMap";
import { Match, Paginations, Player, PlayerData } from "@/utils/types";

interface FormValues {
    name: string;
    status: string[];
    host: any[];
    age: string;
    city: string;
}

const initialValues: FormValues = {
    name: '',
    status: [],
    host: [],
    age: '',
    city: '',
};


export default function MatchesList({ hosts, matches, loading, totalItems, onPageChange, search, onFilterChange, onSizeChange, pagination, filters }: { totalItems: number, hosts: PlayerData[], matches: Match[], loading: boolean, search: string | null, onPageChange: any, onFilterChange: any, onSizeChange: any, pagination: Paginations, filters: any }) {
    type match = typeof matches[0];
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "revenuetotal,solderestant",
        direction: "ascending",
    });

    const hasSearchFilter = Boolean(filterValue);


    const filteredItems = React.useMemo(() => {
        let filteredmatches = [...matches];

        if (hasSearchFilter) {
            filteredmatches = filteredmatches.filter((match) =>
                match.address.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredmatches = filteredmatches.filter((match) =>
                Array.from(statusFilter).includes(match.status),
            );
        }

        return filteredmatches;
    }, [filterValue, statusFilter, hasSearchFilter, matches]);


    const sortedItems = React.useMemo(() => {
        return [...filteredItems].sort((a: match, b: match) => {
            const first = a[sortDescriptor.column as keyof match] as number;
            const second = b[sortDescriptor.column as keyof match] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, filteredItems]);


    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")

    }, [])
    const handleFilters = (obj: FormValues) => {
        // 👇️ take the parameter passed from the Child component
        // setFilters((filt) => ({ ...filt, ...obj }));

    };

    return (
        <div className="flex flex-col gap-[1vh]">
            <div className="flex flex-col gap-[2vw]  mb-[5vh]">
                <div className="flex flex-col gap-3 items-center">
                    <Input
                        isClearable
                        className="w-full"
                        placeholder="Rechercher par match..."
                        classNames={{
                            base: "bg-search rounded-full ",
                            inputWrapper: "h-[2.5vw] w-full bg-search text-darck bg-search pl-6 text-sub-title rounded-md border-none hover:!bg-search ",
                            label: "text-[0.8vw] text-sub-title font-medium px-7 ",
                            input: "rounded-none w-full text-default-500 bg-search px-7"
                        }}
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <AddMatch hosts={hosts} />
                    <div className="flex gap-3 w-full justify-between">
                        <div className=" flex items-center justify-center bg-BG px-[1vw] rounded-md">
                            <select className="bg-BG outline-none font-base 2xl:text-[0.8vw]"
                                onChange={onSizeChange}
                                value={pagination.pageSize}
                            >
                                <option value="15">15</option>
                                <option value="10">10</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        <Dropdown>
                            <DropdownTrigger className="flex">
                                <button className="flex lg:px-[0.6vw] bg-filter gap-[0.3vw] items-center justify-center rounded-md lg:w-auto w-[25vw] ">
                                    <span className="font-base ">Status</span><ChevronDownIcon className="text-small" />
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table playerColumns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        <MatchFilter handleFilters={handleFilters} />
                        <Dropdown>
                            <DropdownTrigger className="flex">
                                <button className="flex items-center justify-center bg-filter w-[20vw] lg:w-[9vh] rounded-md"><ExportIcon width={60} /></button>

                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table matchcolumns"
                                closeOnSelect={false}
                                selectionMode="single"
                            >
                                <DropdownItem onPress={() =>exportCSV(matchcolumns, sortedItems)}>
                                    Export CSV
                                </DropdownItem>
                                <DropdownItem onPress={() =>exportPDF(matchcolumns, sortedItems)}>
                                    Export PDF
                                </DropdownItem>

                            </DropdownMenu>

                        </Dropdown>

                    </div>
                </div>

            </div>
            {loading ?
                <div className=" w-[82vw] h-full flex items-center justify-center">
                    <Spinner/>
                </div>
                :
                <div className="grid w-[90vw]  grid-rows-1 grid-flow-dense gap-[2vh] ">
                    {sortedItems.map((match, key) => (
                        <div className="bg-WT flex flex-col rounded-md shadow-md p-[5vw] gap-[2vw] " key={key}>
                            <div className="flex flex-col px-[3vw] ">
                                <span className="text-sub-title font-base text-[2.5vw]">match</span>
                                <Link href={'/matches/details'}>
                                    <div className="flex flex-col gap-[0.5vh] ">
                                        <span className="font-bold font-medium text-[3.5vw]"> {match.address}</span>
                                        <div className="flex w-[35vw] justify-between">
                                            <div className="flex gap-[1vw]">
                                                <Image
                                                    src={"/date.svg"}
                                                    alt="date"
                                                    width={0} // Set the desired width here
                                                    height={0} // Set the desired height here
                                                    className={`relative w-[2.5vw] h-auto `}
                                                />
                                                <span className="font-medium text-text-mini-2 text-[2.5vw] ">{getMonthName(match.time.toDate().getMonth())} {match.time.toDate().getDate()},{match.time.toDate().getFullYear()}</span>
                                            </div>
                                            <div className="flex gap-[1vw]">
                                                <Image
                                                    src={"/hour.svg"}
                                                    alt="hour"
                                                    width={0} // Set the desired width here
                                                    height={0} // Set the desired height here
                                                    className={`relative w-[2.5vw] h-auto`}
                                                />
                                                <span className="font-medium text-text-mini-2 text-[2.5vw]"> {match.time.toDate().getHours()}:{match.time.toDate().getMinutes()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex justify-between px-[3vw] mt-[1vh]">
                                <Link href="/matches/details">
                                    <div className="flex flex-col">
                                        <span className="text-sub-title text-[2.5vw] font-base">Host</span>
                                        
                                            <Tooltip content={match.host.name}>
                                            
                                                <User
                                                    avatarProps={{ radius: "full", src: match.host.profile }}
                                                    name=""
                                                >
                                                </User>
                                            </Tooltip>
                                        
                                    </div>
                                </Link>
                                <Link href="/matches/details">
                                    <div className="flex flex-col">
                                        <span className="text-sub-title text-[2.5vw] font-base">Joueurs</span>
                                      
                                            <AvatarGroup className="flex justify-start w-[30vw]" isBordered max={2}>
                                                {match.players.map((joueur: { id: string,profile: string }) =>
                                                <Link href={`/players/${joueur.id}`} key={joueur.id}>
                                                    <Avatar src={joueur.profile} 
                                                        classNames={{
                                                            base: "w-[8vw] h-[8vw]",
                                                        }} />
                                                        </Link>
                                                )}
                                            </AvatarGroup>
                                    
                                    </div>
                                </Link>
                                <Link href="/matches/details">
                                    <div className="flex flex-col justify-center w-[4vw] items-center" >
                                        <span className="text-sub-title text-[2.5vw] font-base">Places</span>
                                        <div className="bg-BG flex pr-[1.5vw] rounded-md items-center justify-center w-max">
                                            <div className="flex  bg-green rounded-full items-center justify-center w-[7vw] h-[7vw]">
                                                <span className="font-medium text-WT text-[3vw]"> {match.places}</span>
                                            </div>
                                            <div className="flex rounded-full items-center justify-center w-[7vw] h-[7vw]">
                                                <span className="font-medium text-default-300 text-[3vw]"> {match.type}</span>
                                            </div>
                                            <Image
                                                src={"/places.svg"}
                                                alt="places"
                                                width={0} // Set the desired width here
                                                height={0} // Set the desired height here
                                                className={`relative w-[3vw] h-auto`}
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex justify-between px-[3vw]">
                                <Link href="/matches/details">
                                    <div className="flex flex-col">
                                        <span className="text-sub-title text-[2.5vw] font-base">Ville</span>
                                        <div className="flex"><span className="text-table text-[3.5vw] font-base">{match.city}</span></div>
                                    </div>
                                </Link>
                                <Link href="/matches/details">
                                    <div className="flex flex-col">
                                        <span className="text-sub-title text-[2.5vw] font-base">Total paye</span>
                                        <div className="flex gap-[1vw]"><span className="text-table text-[3.5vw] font-base">{match.totalpaye % 1 === 0 ? match.totalpaye + '.00' : match.totalpaye.toFixed(2)} </span><span className="text-table font-base text-[3.5vw]"> Dhs</span></div>
                                    </div>
                                </Link>
                                <Link href="/matches/details">
                                    <div className="flex flex-col justify-center w-[4vw] items-center" >
                                        <span className="text-sub-title text-[2.5vw] font-base">Status</span>
                                        <div className="flex justify-center" >
                                            <div className={`bg-${statusColorMap[match.status]} w-[3vw] h-[3vw] rounded-full flex`} />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex justify-between px-[3vw] mt-[2vh]">
                                <Link href="/matches/details">
                                    <div className="flex flex-col">
                                        <span className="text-sub-title text-[2.5vw] font-base">Date</span>
                                        <div className="flex"><span className="text-table text-[3.5vw] font-base">{getMonthName(match.created_at.toDate().getMonth())} {match.created_at.toDate().getDate()},{match.created_at.toDate().getFullYear()}</span></div>
                                    </div>
                                </Link>
                                <div className="relative flex items-center">
                                    <Actions name="le match" func="supprimer" id={match.id} />
                                </div>
                            </div>

                        </div>

                    ))}
                </div>
            }
            <div className=" flex flex-col justify-between items-center gap-[2vh] mt-[1vh]">
                <span className=" text-small text-sub-title">Total {totalItems} matches
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
                    page={pagination.page}
                    total={Math.ceil(totalItems / pagination.pageSize)}
                    onChange={onPageChange}
                    variant="light"
                />
            </div>
        </div>
    );
}
