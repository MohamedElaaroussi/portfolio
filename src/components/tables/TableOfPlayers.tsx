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
  Pagination,
  Selection,
  SortDescriptor,
  User
} from "@nextui-org/react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { playercolumns, typeOptions, types } from "../../utils/data";
import { capitalize, getMonthName } from "../../utils/utils";
import Link from "next/link"
import ExportIcon from "../icons/ExportIcon";
import Vanilla from "../icons/Vanilla";
import Actions from "../dropdowns/Actions";
import { Spinner } from "../Spinner";
import MatchFilter from "../modals/MatchFilter";
import { INITIAL_VISIBLE_PLAYERCOLUMNS } from "@/utils/initial_visible_columns";
import { exportCSV, exportPDF } from "@/utils/export";
import { playerRoleColorMap } from "@/utils/statusColorMap";
import { Paginations, Player } from "@/utils/types";

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


export default function TableOfPlayers({ players, loading, totalItems, onPageChange, onFilterChange, onSizeChange, pagination, filters }: { totalItems: number, players: Player[], loading: boolean, onPageChange: any, onFilterChange: any, onSizeChange: any, pagination: Paginations, filters: any }) {
  type player = typeof players[0];
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleplayerColumns, setVisibleplayerColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_PLAYERCOLUMNS));
  const [roleFilter, setRoleFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "revenuetotal,solderestant",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerplayerColumns = React.useMemo(() => {
    if (visibleplayerColumns === "all") return playercolumns;

    return playercolumns.filter((column) => Array.from(visibleplayerColumns).includes(column.uid));
  }, [visibleplayerColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredplayers = [...players];

    if (hasSearchFilter) {
      filteredplayers = filteredplayers.filter((player) =>
        player.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (roleFilter !== "all" && Array.from(roleFilter).length !== types.length) {
      filteredplayers = filteredplayers.filter((player) =>
        Array.from(roleFilter).includes(player.role),
      );
    }

    return filteredplayers;
  }, [filterValue, roleFilter, hasSearchFilter, players]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: player, b: player) => {
      const first = a[sortDescriptor.column as keyof player] as number;
      const second = b[sortDescriptor.column as keyof player] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const renderCell = React.useCallback((player: player, columnKey: React.Key) => {
    const cellValue = player[columnKey as keyof player];
    const soldeRestant = player.soldeRestant % 1 === 0 ? player.soldeRestant + '.00' : player.soldeRestant.toFixed(2)
    const revenueTotal = player.revenueTotal % 1 === 0 ? player.revenueTotal + '.00' : player.revenueTotal.toFixed(2)


    switch (columnKey) {
      case "joueur":
        return (
          <Link href={`/players/${player.id}`}>
            <User
              avatarProps={{ radius: "md", src: player.profile }}
              description={player.email}
              name={player.name}
            >
              <span className="text-text-mini-2">{player.email}</span>
            </User>
          </Link>
        );
      case "revenuetotal":
        return (
          <Link href="/players/details">
            <div className="flex gap-[0.3vw] ">
              <span className="text-table font-medium">{revenueTotal} </span><span className="text-table font-medium"> Dhs</span>
            </div>
          </Link>
        );
      case "solderestant":
        return (
          <Link href="/players/details">
            <div className="flex gap-[0.3vw]">
              <span className="text-table font-medium">{soldeRestant} </span><span className="text-table font-medium">Dhs</span>
            </div>
          </Link>
        );
      // case "role":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-small capitalize">{cellValue}</p>
      //       <p className="text-bold text-tiny capitalize text-default-400">{player.team}</p>
      //     </div>
      //   );
      case "email":
        return (
          <Link href="/players/details">
            <span className="text-table font-medium">{player.email}</span>
          </Link>
        );
      case "dateajout":
        return (
          <Link href="/players/details">
            <span className="text-table font-medium">{getMonthName(player.time.toDate().getMonth())} {player.time.toDate().getDate()}, {player.time.toDate().getFullYear()}</span>
          </Link>
        );
      case "role":
        return (
          <Link href="/players/details">
            <div className="flex justify-center w-[5vw]" >
              <Vanilla width={17} height={17} color={playerRoleColorMap[player.role]} />
            </div>
          </Link>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Actions name="le joueur" func="supprimer" id={player.id} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
    // setFilters((filt) => ({...filt, ...obj}));

  };


  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-[2vw] mb-[5vh]">
        <div className="flex justify-between gap-3 items-end w-full">
          <Input
            isClearable
            className="w-full sm:max-w-[35%]"
            placeholder="Rechercher par joueur..."
            classNames={{
              base: "bg-search rounded-full ",
              inputWrapper: "h-[2.5vw] bg-search text-darck bg-search pl-6 text-sub-title rounded-md border-none hover:!bg-search ",
              label: "text-[0.8vw] text-sub-title font-medium px-7 ",
              input: "rounded-none text-default-500 bg-search px-7"
            }}
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <div className=" flex items-center justify-center bg-BG px-[1vw] rounded-md">
              <select className="bg-BG outline-none font-base  xl:text-[1vw] 2xl:text-[0.8vw]"
                onChange={onSizeChange}
                value={pagination.pageSize}
              >
                <option value="2">2</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <button className="flex px-[0.6vw] bg-filter gap-[0.3vw] items-center justify-center rounded-md ">
                  <span className="font-base xl:text-[1vw] 2xl:text-[0.8vw]">Role</span><ChevronDownIcon className="text-small" />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table playerColumns"
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode="multiple"
                onSelectionChange={setRoleFilter}
              >
                {typeOptions.map((role) => (
                  <DropdownItem key={role.uid} className="capitalize">
                    {capitalize(role.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <button className="flex px-[0.7vw] bg-filter gap-[0.3vw] items-center justify-center rounded-md ">
                  <span className="font-base  xl:text-[1vw] 2xl:text-[0.8vw]">Colonnes</span><ChevronDownIcon className="text-small" />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table playerColumns"
                closeOnSelect={false}
                selectedKeys={visibleplayerColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleplayerColumns}
              >
                {playercolumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <MatchFilter handleFilters={handleFilters} />
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <button className="flex items-center bg-filter px-[0vw]  rounded-md"><ExportIcon width={70} /></button>

              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table playerColumns"
                closeOnSelect={false}
                selectionMode="single"
              >
                <DropdownItem onPress={() =>exportCSV(headerplayerColumns,sortedItems)}>
                  Export CSV
                </DropdownItem>
                <DropdownItem onPress={() =>exportPDF(headerplayerColumns,sortedItems)}>
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
    roleFilter,
    visibleplayerColumns,
    onSearchChange,
    onSizeChange,
    onClear,
    pagination,
    headerplayerColumns,
    sortedItems
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">Total {totalItems} joueurs
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
  }, [pagination, totalItems, onPageChange]);

  return (
    <div className="flex w-max h-max p-9  bg-WT rounded-md shadow-md">
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
          <TableHeader columns={headerplayerColumns}>
            {(column: any) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "role" ? "center" : "start"}
                allowsSorting={column.sortable}
                className="text-sub-title "
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No players found"} items={sortedItems} >
            {(item) => (
              <TableRow key={item.id} className="border-b-1 border-default-100 hover:bg-default-100 h-[9vh] cursor-pointer">
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      }
    </div>
  );
}
