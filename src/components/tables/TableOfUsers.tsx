import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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
import {ChevronDownIcon} from "../icons/ChevronDownIcon";
import {SearchIcon} from "../icons/SearchIcon";
import {usercolumns, roleOptions} from "../../utils/data";
import {capitalize, getMonthName} from "../../utils/utils";
import MatchFilter from "../modals/MatchFilter";
import ExportIcon from "../icons/ExportIcon";
import Link from "next/link";
import Actions from "../dropdowns/Actions";
import { Spinner } from "../Spinner";
import { INITIAL_VISIBLE_USERCOLUMNS } from "@/utils/initial_visible_columns";
import { exportCSV, exportPDF } from "@/utils/export";
import { Paginations } from "@/utils/types";
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


export default function TableOfUsers({ utilisateurs,loading,totalItems, onPageChange,onFilterChange,onSizeChange, pagination, filters }: { totalItems:number,utilisateurs:any, loading:boolean ,onPageChange: any, onFilterChange: any, onSizeChange: any, pagination: Paginations, filters: any }) {
  type utilisateur = typeof utilisateurs[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleuserColumns, setVisibleuserColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_USERCOLUMNS));
  const [roleFilter, setroleFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "revenuetotal",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headeruserColumns = React.useMemo(() => {
    if (visibleuserColumns === "all") return usercolumns;

    return usercolumns.filter((column) => Array.from(visibleuserColumns).includes(column.uid));
  }, [visibleuserColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredutilisateurs = [...utilisateurs];

    if (hasSearchFilter) {
      filteredutilisateurs = filteredutilisateurs.filter((utilisateur) =>
        utilisateur.utilisateur.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (roleFilter !== "all" && Array.from(roleFilter).length !== roleOptions.length) {
      filteredutilisateurs = filteredutilisateurs.filter((utilisateur) =>
        Array.from(roleFilter).includes(utilisateur.role),
      );
    }

    return filteredutilisateurs;
  }, [ filterValue, roleFilter,hasSearchFilter,utilisateurs]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);


  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: utilisateur, b: utilisateur) => {
      const first = a[sortDescriptor.column as keyof utilisateur] as number;
      const second = b[sortDescriptor.column as keyof utilisateur] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const renderCell = React.useCallback((utilisateur: utilisateur, columnKey: React.Key) => {
    const cellValue = utilisateur[columnKey as keyof utilisateur];
        // Determine whether it's AM or PM
    const period = utilisateur.created_at.toDate().getHours() < 12 ? 'am' : 'pm';

    switch (columnKey) {
      case "utilisateur":
        return (
          <Link  href="/users/details">
          <User
            avatarProps={{radius: "md", src: utilisateur.profile}}
            description={utilisateur.email}
            name={utilisateur.name}
          >
           <span className="text-text-mini-2"> {utilisateur.email}</span>
          </User>
          </Link>
        );
      case "role":
        return (
          <Link  href="/users/details">
          <div className="flex bg-BG w-[5vw] h-[1.5vw] items-center justify-center rounded-xl">
            <p className="text-bold text-tiny capitalize font-medium">{utilisateur.role}</p>
          </div>
          </Link>
        );

        case "dernierconnexion":
          return (
            <div className="flex bg-BG w-[5vw] h-[1.5vw] items-center justify-center rounded-xl">
              <p className="text-bold text-tiny capitalize text-table">{utilisateur.dernierconnexion}</p>
            </div>
          );  
          case "datecreation":
            return (
              <div className="flex items-center gap-[0.2vw]">
                <p className="text-table font-medium">{getMonthName(utilisateur.created_at.toDate().getMonth())} {utilisateur.created_at.toDate().getDate()}, {utilisateur.created_at.toDate().getFullYear()}</p>
                <p className="text-bold text-tiny text-sub-title">{utilisateur.created_at.toDate().getHours()}:{utilisateur.created_at.toDate().getMinutes()} {period}</p>
              </div>
            );  

      // case "role":
      //   return (
      //     <div className="flex justify-center w-[2.5vw]">
      //     <div className={`bg-${roleColorMap[utilisateur.role]} w-[0.9vw] h-[0.9vw] rounded-full flex`} />
      //     </div>
      //   );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Actions name="l'utilisateur" func="supprimer" id={utilisateur.id}/>
            </div>
          );
      default:
        return cellValue;
    }
  }, []);


  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])
  const handleFilters = (obj: FormValues) => {
    // 👇️ take the parameter passed from the Child component
    // setFilters((filt) => ({...filt, ...obj}));

  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-[2vw] mb-[5vh]">
      <div className="flex justify-between gap-3 items-end w-full">
        <Input
          isClearable
          className="w-full sm:max-w-[35%]"
          placeholder="Rechercher par utilisateur..."
          classNames={{
            base: "bg-search rounded-full ",
            inputWrapper: "h-[2.5vw] bg-search text-darck rounded-md pl-6 border-none hover:!bg-search ",
            label:"text-[0.8vw] text-sub-title font-medium px-7 ",
            input:"rounded-none text-default-500 bg-search px-7"
          }}
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3 ">
          <div className=" flex items-center justify-center bg-BG px-[1vw] rounded-md">
            <select className="bg-BG outline-none font-base lg:text-[1vw] 2xl:text-[0.8vw]"
                onChange={onSizeChange}
                value={pagination.pageSize}
            >
              <option value="15">15</option>
              <option value="10">10</option>
              <option value="5">5</option>
            </select>
          </div>
          <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
                <button className="flex px-[0.6vw] bg-filter gap-[0.3vw] items-center justify-center rounded-md ">
                <span className="font-base lg:text-[1vw] 2xl:text-[0.8vw]">Role</span><ChevronDownIcon className="text-small" />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table userColumns"
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
          <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
              <button className="flex px-[0.7vw] bg-filter gap-[0.3vw] items-center justify-center rounded-md ">
                <span className="font-base lg:text-[1vw] 2xl:text-[0.8vw]">Colonnes</span><ChevronDownIcon className="text-small" />
                </button>
              </DropdownTrigger>
    
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table userColumns"
                closeOnSelect={false}
                selectedKeys={visibleuserColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleuserColumns}
              >
                {usercolumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <MatchFilter handleFilters={handleFilters}/>
          <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <button className="flex items-center bg-filter px-[0.6vw]  rounded-md"><ExportIcon width={70}/></button>
                 
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table matchColumns"
                closeOnSelect={false}
                selectionMode="single"
              >
                <DropdownItem onPress={() =>exportCSV(headeruserColumns,sortedItems)}>
                  Export CSV
                </DropdownItem>
                <DropdownItem onPress={() =>exportPDF(headeruserColumns,sortedItems)}>
                  Export PDF
                </DropdownItem>
              </DropdownMenu>
              </Dropdown>
              <AddUser/>
              
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    roleFilter,
    visibleuserColumns,
    onSearchChange,
    onSizeChange,
    onClear,
    pagination,
    headeruserColumns,
    sortedItems
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-sub-title">
        Total {totalItems} utilisateurs
        </span>
        <Pagination
          isCompact
          showControls
          classNames={{
            base:"text-WT",
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
    );
  }, [pagination,totalItems,onPageChange]);

  return (
    <div className=" w-max h-max p-9 bg-WT rounded-md shadow-md ">
            {loading ?
        <div className=" w-[82vw] h-full flex items-center justify-center">
          <Spinner/>
        </div>
        :
    <Table
        removeWrapper
        aria-label="Example static collection table"
      bottomContent={bottomContent}
      classNames={{
        base: "w-[82vw]",
      }}
      bottomContentPlacement="outside"
      // selectedKeys={selectedKeys}
      // selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      // onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headeruserColumns}>
        {(column:any) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
            className="text-sub-title"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No utilisateurs found"} items={sortedItems} >
        {(item) => (
          <TableRow  className="border-b-1 border-default-100 h-[9vh] hover:bg-default-100 cursor-pointer">
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
}
    </div>
  );
}
