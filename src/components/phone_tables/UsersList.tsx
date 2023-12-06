import React from "react";
import {
    Input,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    User,
    Pagination,
    Selection,
    SortDescriptor,
} from "@nextui-org/react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { usercolumns, roleOptions } from "../../utils/data";
import { capitalize, getMonthName } from "../../utils/utils";
import { useDisclosure } from "@nextui-org/react";
import Link from "next/link"
import ExportIcon from "../icons/ExportIcon";
import MatchFilter from "../modals/MatchFilter";
import Actions from "../dropdowns/Actions";
import { Spinner } from "../Spinner";
import { Paginations } from "@/utils/types";
import { exportCSV, exportPDF } from "@/utils/export";
import AddUser from "../add_item/AddUser";


interface FormValues {
    name: string;
    role: string[];
    host: any[];
    age: string;
    city: string;
}

const initialValues: FormValues = {
    name: '',
    role: [],
    host: [],
    age: '',
    city: '',
};


export default function UsersList({ utilisateurs, loading, totalItems, onPageChange, onFilterChange, onSizeChange, pagination, filters }: { totalItems: number, utilisateurs: any, loading: boolean, onPageChange: any, onFilterChange: any, onSizeChange: any, pagination: Paginations, filters: any }) {
    type utilisateur = typeof utilisateurs[0];
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [roleFilter, setroleFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "revenuetotal,solderestant",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const hasSearchFilter = Boolean(filterValue);


    const filteredItems = React.useMemo(() => {
        let filteredusers = [...utilisateurs];

        if (hasSearchFilter) {
            filteredusers = filteredusers.filter((utilisateur) =>
                utilisateur.utilisateur.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (roleFilter !== "all" && Array.from(roleFilter).length !== roleOptions.length) {
            filteredusers = filteredusers.filter((utilisateur) =>
                Array.from(roleFilter).includes(utilisateur.role),
            );
        }

        return filteredusers;
    }, [filterValue, roleFilter, hasSearchFilter, utilisateurs]);


    const sortedItems = React.useMemo(() => {
        return [...filteredItems].sort((a: utilisateur, b: utilisateur) => {
            const first = a[sortDescriptor.column as keyof utilisateur] as number;
            const second = b[sortDescriptor.column as keyof utilisateur] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, filteredItems]);


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
                                    <span className="font-base ">Role</span><ChevronDownIcon className="text-small" />
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table playerColumns"
                                closeOnSelect={false}
                                selectedKeys={roleFilter}
                                selectionMode="multiple"
                                onSelectionChange={setroleFilter}
                            >
                                {roleOptions.map((role) => (
                                    <DropdownItem key={role.uid} className="capitalize">
                                        {capitalize(role.name)}
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
                                aria-label="Table matchColumns"
                                closeOnSelect={false}
                                selectionMode="single"
                            >
                                <DropdownItem onPress={() =>exportCSV(usercolumns, sortedItems)}>
                                    Export CSV
                                </DropdownItem>
                                <DropdownItem onPress={() =>exportPDF(usercolumns, sortedItems)}>
                                    Export PDF
                                </DropdownItem>

                            </DropdownMenu>

                        </Dropdown>

                    </div>
                        <AddUser/>
                </div>


            </div>
            {loading ?
                <div className=" w-[82vw] h-full flex items-center justify-center">
                    <Spinner/>
                </div>
                :
                <div className="grid w-[90vw]  grid-rows-1 grid-flow-dense gap-[2vh]">
                    {sortedItems.map((utilisateur, key) => (
                        <div className="bg-WT flex flex-col rounded-md shadow-md p-[5vw] gap-[1vw]" key={key}>
                            <span className="text-sub-title font-base ml-[13vw] text-[2.5vw]">Utilisateur</span>
                            <Link href="/users/details">
                                <User
                                    avatarProps={{ radius: "md", src: utilisateur.profile }}
                                    description={utilisateur.email}
                                    name={utilisateur.name}
                                >
                                    <span className="text-text-mini-2">{utilisateur.email}</span>
                                </User>
                            </Link>
                            <div className="flex justify-between px-[3vw]">
                                <Link href="/users/details">
                                    <div className="flex flex-col">
                                        <span className="text-sub-title text-[2.5vw] font-base">Heure</span>
                                        <div className="flex"><span className="text-table text-[3.5vw] font-base">{utilisateur.created_at.toDate().getHours()}:{utilisateur.created_at.toDate().getMinutes()} {utilisateur.created_at.toDate().getHours() < 12 ? 'am' : 'pm'}</span></div>
                                    </div>
                                </Link>
                                <Link href="/users/details">
                                    <div className="flex flex-col">
                                        <span className="text-sub-title text-[2.5vw] font-base">Dernier connextion</span>
                                        <div className="flex"><span className="text-table text-[3.5vw] font-base">{utilisateur.dernierconnexion}</span></div>
                                    </div>
                                </Link>
                                <Link href="/users/details">
                                    <div className="flex flex-col justify-center w-[4vw] items-center" >
                                        <span className="text-sub-title text-[2.5vw] font-base">role</span>
                                        <div className="flex"><span className="text-table text-[3.5vw] font-base capitalize">{utilisateur.role}</span></div>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex justify-between px-[3vw] mt-[2vh]">
                                <Link href="/users/details">
                                    <div className="flex flex-col">
                                        <span className="text-sub-title text-[2.5vw] font-base">Date creation</span>
                                        <div className="flex"><span className="text-table text-[3.5vw] font-base">{getMonthName(utilisateur.created_at.toDate().getMonth())} {utilisateur.created_at.toDate().getDate()}, {utilisateur.created_at.toDate().getFullYear()}</span></div>
                                    </div>
                                </Link>
                                <div className="relative flex items-center">
                                    <Actions name="l'utilisateur" func="supprimer" id={utilisateur.id} />
                                </div>
                            </div>

                        </div>

                    ))}
                </div>
            }
            <div className=" flex flex-col justify-between items-center gap-[2vh] mt-[1vh]">
                <span className=" text-small text-sub-title">Total {totalItems} utilisateurs
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
