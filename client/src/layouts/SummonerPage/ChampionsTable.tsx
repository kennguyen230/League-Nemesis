import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setDisplayLane: React.Dispatch<React.SetStateAction<string>>;
}

export function ChampionsTable<TData, TValue>({
  columns,
  data,
  setDisplayLane,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // Fixes a bug where if a user sorts the table then does a new search,
  // the table for the new user will be sorted from the get-go. So on a
  // new search, reset the table back to default
  React.useEffect(() => {
    setSorting([]);
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="mt-4 mx-4 p-2 rounded-md bg-gray-600 font-vollkorn md:mx-20 md:mt-6 md:p-6">
      {/* Lane dropdown menu */}
      <div className="flex items-center py-4 gap-2">
        {/* Dropdown */}
        <Select onValueChange={setDisplayLane}>
          <SelectTrigger className="w-[180px] text-gray-400 dark:bg-white">
            <SelectValue placeholder="Overall" />
          </SelectTrigger>
          <SelectContent className="font-vollkorn w-[150px]">
            <SelectItem value="overall">Overall</SelectItem>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="jng">Jungle</SelectItem>
            <SelectItem value="mid">Mid</SelectItem>
            <SelectItem value="bot">Bot</SelectItem>
            <SelectItem value="sup">Support</SelectItem>
          </SelectContent>
        </Select>
        {/* Search bar */}
        <Input
          placeholder="Search champions"
          value={
            (table.getColumn("champName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("champName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* The table itself */}
      <div className="border rounded-sm">
        <Table>
          <TableHeader className="bg-[#3A3A3A] dark:bg-[#3A3A3A]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="text-white dark:text-white dark:hover:bg-white"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    // This is where you can edit the table entry CSS
                    <TableCell className="bg-white py-1" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Next & previous buttons */}
      <div className="flex items-center justify-end space-x-2 py-4 ">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="dark:bg-white"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="dark:bg-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
