import React, { useRef } from "react";
import {
  Table,
  Avatar,
  AvatarGroup,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Tooltip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";
import "jspdf-autotable";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { matchcolumns, statusOptions } from "../../utils/data";
import { capitalize, getMonthName } from "../../utils/utils";
import Link from "next/link";
import ExportIcon from "../icons/ExportIcon";
import MatchFilter from "../modals/MatchFilter";
import AddMatch from "../add_item/AddMatch";
import Actions from "../dropdowns/Actions";
import { Spinner } from "../Spinner";
import { setPagination, setSearch } from "@/reducers/matchSlice";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { exportCSV, exportPDF } from "@/utils/export";
import { statusColorMap } from "@/utils/statusColorMap";
import { Match, Paginations, Player, PlayerData } from "@/utils/types";
import { INITIAL_VISIBLE_MATCHCOLUMNS } from "@/utils/initial_visible_columns";


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



export default function TableOfMatches({ hosts, matches, loading, totalItems, onPageChange, search, onFilterChange, onSizeChange, pagination, filters }: { totalItems: number, hosts: PlayerData[], matches: Match[], loading: boolean, search: string | null, onPageChange: any, onFilterChange: any, onSizeChange: any, pagination: Paginations, filters: any }) {

  const dispatch = useDispatch();
  type match = typeof matches[0];
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [exports, setExport] = React.useState<Selection>(new Set([]));
  const [visiblematchColumns, setVisiblematchColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_MATCHCOLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "revenuetotal",
    direction: "ascending",
  });


  const headermatchColumns = React.useMemo(() => {
    if (visiblematchColumns === "all") return matchcolumns;

    return matchcolumns.filter((column) => Array.from(visiblematchColumns).includes(column.uid));
  }, [visiblematchColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredmatches = [...matches];

    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredmatches = filteredmatches.filter((match) =>
        Array.from(statusFilter).includes(match.status),
      );
    }

    return filteredmatches;
  }, [ statusFilter, matches]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: match, b: match) => {
      const first = a[sortDescriptor.column as keyof match] as number;
      const second = b[sortDescriptor.column as keyof match] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const renderCell = React.useCallback((match: match, columnKey: React.Key) => {
    const cellValue = match[columnKey as keyof match];
    const totalpaye = match.totalpaye % 1 === 0 ? match.totalpaye + '.00' : match.totalpaye.toFixed(2);
    const period = match.time.toDate().getHours() < 12 ? 'am' : 'pm';
    switch (columnKey) {
      case "joueurs":
        return (
          <AvatarGroup className="flex justify-start w-[5vw]" isBordered max={2}>
              {match.players.map((joueur: {profile: string,id:string }) =>
              <Link href={`/players/${joueur.id}`} key={joueur.id} >
                <Avatar src={joueur.profile}/>
              </Link>
              )}
            </AvatarGroup>

        );
      case "ville":
        return (
          <Link href={`/matches/${match.id}`}>
            <span className="text-table font-medium">{match.city}</span>
          </Link>
        );
      case "host":
        return (
          <Link href={`/players/${match.host.id}`}>
            <Tooltip content={match.host.name}>
              <User
                avatarProps={{ radius: "full", src: match.host.profile }}
                name=""
              >
              </User>
            </Tooltip>
          </Link>
        );
      case "match":
        return (
          <Link href={`/matches/${match.id}`}>
            <div className="flex flex-col w-[10vw] gap-[1vh] ">
              <span className="font-bold text-[0.75vw] text-darck font-medium"> {match.address}</span>
              <div className="flex justify-between">
                <div className="flex gap-[0.4vw] items-center">
                  <Image
                    src={"/date.svg"}
                    alt="date"
                    width={0} // Set the desired width here
                    height={0} // Set the desired height here
                    className={`relative w-[0.7vw] h-auto `}
                  />
                  <span className="font-medium text-text-mini-2 text-[0.7vw]">{getMonthName(match.time.toDate().getMonth())} {match.time.toDate().getDate()},{match.time.toDate().getFullYear()}</span>
                </div>
                <div className="flex gap-[0.4vw] items-center">
                  <Image
                    src={"/hour.svg"}
                    alt="hour"
                    width={0} // Set the desired width here
                    height={0} // Set the desired height here
                    className={`relative w-[0.7vw] h-auto`}
                  />
                  <span className="font-medium text-text-mini-2 text-[0.7vw]">{match.time.toDate().getHours()}:{match.time.toDate().getMinutes()} {period}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      case "places":
        return (
          <div className="bg-BG flex pr-[0.5vw] rounded-md items-center justify-center w-max">
            <div className="flex  bg-green rounded-full items-center justify-center w-[2vw] h-[2vw]">
              <span className="font-medium text-WT text-[0.9vw]"> {match.places}</span>
            </div>
            <div className="flex rounded-full items-center justify-center w-[2vw] h-[2vw]">
              <span className="font-medium text-default-300 text-[0.9vw]"> {match.type * 2}</span>
            </div>
            <Image
              src={"/places.svg"}
              alt="places"
              width={0} // Set the desired width here
              height={0} // Set the desired height here
              className={`relative w-[0.9vw] h-auto`}
            />
          </div>
        );
      // case "role":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-small capitalize">{cellValue}</p>
      //       <p className="text-bold text-tiny capitalize text-default-400">{match.team}</p>
      //     </div>
      //   );
      case "status":
        return (
          <div className="flex justify-center w-[2.5vw]" >
            <div className={`bg-${statusColorMap[match.status]} w-[0.9vw] h-[0.9vw] rounded-full flex`} />
          </div>
        );
      case "totalpaye":
        return (
          <div className="flex gap-[0.3vw]">
            <span className="text-table font-medium" >{totalpaye} </span><span className="text-table font-medium">Dhs</span>
          </div>
        );
        case "prix":
          return (
            <div className="flex gap-[0.3vw]">
              <span className="text-table font-medium" >{match.price} </span><span className="text-table font-medium">Dhs</span>
            </div>
          );
      case "actions":
        return (
          <div className="relative flex items-center">
            <Actions name="le match" func="annuler" id={match.id} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // Debounce the search function
  const delayedSearch = debounce((text) => {
    dispatch(setSearch(text));
    dispatch(setPagination({ ...pagination, page: 1 }));
  }, 2000); // Adjust the delay time (in milliseconds) as needed

  const onSearchChange = (text: string) => {
    delayedSearch(text);
  };

  const onClear = React.useCallback(() => {
    dispatch(setSearch(''));
    dispatch(setPagination({ ...pagination, page: 1 }));
    // setPage(1)
  }, [dispatch,pagination]);
  const handleFilters = (obj: FormValues) => {
    // 👇️ take the parameter passed from the Child component
    // setFilters((filt) => ({ ...filt, ...obj }));

  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-[2vw] mb-[5vh]">
        <div className="flex justify-between gap-3 items-end w-full">
          <Input
            isClearable
            className="w-full sm:max-w-[35%]"
            placeholder="Rechercher par match..."
            classNames={{
              base: "bg-search rounded-full ",
              inputWrapper: "h-[2.5vw] bg-search text-darck bg-search pl-6 text-sub-title rounded-md border-none hover:!bg-search ",
              label: "text-[0.8vw] text-sub-title font-medium px-7 ",
              input: "rounded-none text-default-500 bg-search px-7"
            }}
            startContent={<SearchIcon />}
            // value={search}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3 ">
            <AddMatch hosts={hosts} />

            <ToastContainer />
            <div className=" flex items-center justify-center bg-BG px-[1vw] rounded-md">
              <select className="bg-BG outline-none font-base xl:text-[1vw] 2xl:text-[0.8vw]"
                onChange={onSizeChange}
                value={pagination.pageSize}
              >
                <option value="2">2</option>
                <option value="15">15</option>
                <option value="10">10</option>

              </select>
            </div>
            {/* <Button color="success" endContent={<PlusIcon color="white"/>} className="h-[5vh]">
              <span className="text-WT">Ajouter un match</span>
            </Button> */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <button className="flex px-[0.6vw] bg-filter gap-[0.3vw] items-center justify-center rounded-md ">
                  <span className="font-base xl:text-[1vw] 2xl:text-[0.8vw]">Status</span><ChevronDownIcon className="text-small" />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table matchColumns"
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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <button className="flex px-[0.7vw] bg-filter gap-[0.3vw] items-center justify-center rounded-md ">
                  <span className="font-base xl:text-[1vw] xl:text-[1vw] 2xl:text-[0.8vw]">Colonnes</span><ChevronDownIcon className="text-small" />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table matchColumns"
                closeOnSelect={false}
                selectedKeys={visiblematchColumns}
                selectionMode="multiple"
                onSelectionChange={setVisiblematchColumns}
              >
                {matchcolumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <MatchFilter handleFilters={handleFilters} />
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <button className=" flex items-center bg-filter px-[0.6vw]  rounded-md"><ExportIcon width={70} /></button>

              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table matchColumns"
                closeOnSelect={false}
                selectedKeys={exports}
                selectionMode="single"
                onSelectionChange={setExport}
              >
                <DropdownItem onPress={() =>exportCSV(headermatchColumns,sortedItems)}>
                  Export CSV
                </DropdownItem>
                <DropdownItem onPress={() =>exportPDF(headermatchColumns,sortedItems)}>
                  Export PDF
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>


          </div>
        </div>

      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visiblematchColumns,
    onSearchChange,
    onClear,
    exportCSV,
    onSizeChange,
    exportPDF,
    exports,
    pagination,
    hosts,
    headermatchColumns,
    sortedItems
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-sub-title">Total {totalItems} matches
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
    );
  }, [pagination, onPageChange,totalItems]);

  return (
    <div className=" w-max p-9 h-max bg-WT rounded-md shadow-md dark:bg-gray-500">
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
            base: " w-[82vw]",
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
          <TableHeader columns={headermatchColumns}>
            {(column: any) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "joueurs" ? "end" : "center"}
                allowsSorting={column.sortable}
                className="text-sub-title"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No matchs found"} items={sortedItems} >
            {(item) => (
              <TableRow key={item.id} className="group border-b-1 border-default-100 h-[9vh] hover:bg-default-100 cursor-pointer">
                {(columnKey) => <TableCell >{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      }
    </div>
  );
}
