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
  SortDescriptor
} from "@nextui-org/react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { ordercolumns, statusOptions, statuscart } from "../../utils/data";
import { capitalize } from "../../utils/utils";
import MatchFilter from "../modals/MatchFilter";
import ExportIcon from "../icons/ExportIcon";
import Link from "next/link";
import CartIcons from "../icons/CartIcons";
import Actions from "../dropdowns/Actions";
import { Spinner } from "../Spinner";
import { exportCSV, exportPDF } from "@/utils/export";
import { orderStatusColorMap } from "@/utils/statusColorMap";
import { Order, Paginations } from "@/utils/types";
import { INITIAL_VISIBLE_ORDERCOLUMNS } from "@/utils/initial_visible_columns";

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


export default function TableOfOrders({ orders, loading, totalItems, onPageChange, onFilterChange, onSizeChange, pagination, filters }: { totalItems: number, orders: Order[], loading: boolean, onPageChange: any, onFilterChange: any, onSizeChange: any, pagination: Paginations, filters: any }) {
  type Order = typeof orders[0];
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleorderColumns, setVisibleorderColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_ORDERCOLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "montant",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerorderColumns = React.useMemo(() => {
    if (visibleorderColumns === "all") return ordercolumns;

    return ordercolumns.filter((column) => Array.from(visibleorderColumns).includes(column.uid));
  }, [visibleorderColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredorders = [...orders];

    if (hasSearchFilter) {
      filteredorders = filteredorders.filter((order) =>
        order.match.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredorders = filteredorders.filter((order) =>
        Array.from(statusFilter).includes(order.status),
      );
    }

    return filteredorders;
  }, [filterValue, statusFilter, hasSearchFilter, orders]);


  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: Order, b: Order) => {
      const first = a[sortDescriptor.column as keyof Order] as number;
      const second = b[sortDescriptor.column as keyof Order] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const renderCell = React.useCallback((order: Order, columnKey: React.Key) => {
    const cellValue = order[columnKey as keyof Order];

    switch (columnKey) {
      case "match":
        return (
          <Link href={`/orders/${order.id}`}>  <span className="font-bold text-[0.75vw] text-darck"> {order.match.name}</span></Link>
        );
      // case "role":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-small capitalize">{cellValue}</p>
      //       <p className="text-bold text-tiny capitalize text-default-400">{order.team}</p>
      //     </div>
      //   );
      case "nom":
        return (
          <Link href={`/players/${order.user.userId}`}>  <span className="text-table font-medium">{order.user.name}</span></Link>
        );
      case "modedepaiement":
        return (
          <Link href="/orders/details"><div className="flex gap-[0.5vw] items-center">
            <CartIcons name={order.provider.toLowerCase()} />
            <span className="text-table font-medium">{order.provider==="sold" ? "Paye par solde":"Paye par cart"}</span>
          </div>
          </Link>
        );
      case "date":
        return (
          <Link href="/orders/details"><span className="text-table font-medium">{order.time.toDate().getDate()}/{order.time.toDate().getMonth()}/{order.time.toDate().getFullYear()}</span></Link>
        );
      case "status":
        return (
          <Link href="/orders/details">  <div className="flex justify-center w-[2.5vw]" >
            <div className={`bg-${orderStatusColorMap[order.status]} w-[0.9vw] h-[0.9vw] rounded-full flex`} />
          </div> </Link>
        );
      case "montant":
        return (
          <Link href="/orders/details">
            <div className="flex">
              <span className="text-table font-medium">{order.amount}</span><span className="text-table font-medium"> dh</span>
            </div>
          </Link>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Actions name="la commande" func="annuler" id={order.id} />
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

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])
  const handleFilters = (obj: FormValues) => {
    // 👇️ take the parameter passed from the Child component
    // setFilters((filt) => ({ ...filt, ...obj }));

  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-[2vw] mb-[5vh] ">
        <div className="flex justify-between gap-3 items-end w-full">
          <Input
            isClearable
            className="w-full sm:max-w-[35%]"
            placeholder="Rechercher par commande..."
            classNames={{
              base: "bg-search rounded-full ",
              inputWrapper: "h-[2.5vw] bg-search text-darck pl-6 bg-search text-sub-title rounded-md border-none hover:!bg-search ",
              label: "xl:text-[1vw] 2xl:text-[0.8vw] text-sub-title font-medium px-7 ",
              input: "rounded-none text-default-500 bg-search px-7"
            }}
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <div className=" flex items-center justify-center bg-BG px-[1vw] rounded-md">
              <select className="bg-BG outline-none font-base xl:text-[1vw] 2xl:text-[0.8vw] "
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
                  <span className="font-base xl:text-[1vw] 2xl:text-[0.8vw]">Status</span><ChevronDownIcon className="text-small" />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table orderColumns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statuscart.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <button className="flex px-[0.7vw] bg-filter gap-[0.3vw] items-center justify-center rounded-md ">
                  <span className="font-base xl:text-[1vw] 2xl:text-[0.8vw]">Colonnes</span><ChevronDownIcon className="text-small" />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table orderColumns"
                closeOnSelect={false}
                selectedKeys={visibleorderColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleorderColumns}
              >
                {ordercolumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <MatchFilter handleFilters={handleFilters} />
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <button className="flex items-center bg-filter px-[0.6vw]  rounded-md"><ExportIcon width={70} /></button>

              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table matchColumns"
                closeOnSelect={false}
                selectionMode="single"
              >
                <DropdownItem onPress={() =>exportCSV(headerorderColumns,sortedItems)}>
                  Export CSV
                </DropdownItem>
                <DropdownItem onPress={() =>exportPDF(headerorderColumns,sortedItems)}>
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
    visibleorderColumns,
    onSearchChange,
    onClear,
    onSizeChange,
    pagination,
    headerorderColumns,
    sortedItems
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">Total {totalItems} commandes
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
          <TableHeader columns={headerorderColumns} className="flex justify-center items-center bg-[#F9F9F9]">
            {(column: any) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
                className="text-sub-title "
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No orders found"} items={sortedItems} className="flex justify-center items-center">
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
