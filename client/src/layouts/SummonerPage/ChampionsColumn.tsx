import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export type ChampionEntry = {
  champion: string;
  icon: string;
  losses: number;
  encounters: number;
  lossratio: number;
};

export const columns: ColumnDef<ChampionEntry>[] = [
  {
    header: "#",
    accessorKey: "rowNumber",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
  },
  //   {
  //     accessorKey: "icon",
  //     header: "",
  //   },
  {
    accessorKey: "champion",
    header: "Champion",
  },
  {
    accessorKey: "losses",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Losses
          <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("losses")}</div>;
    },
  },
  {
    accessorKey: "encounters",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Encounters
          <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
        </Button>
      );
    },
  },
  {
    accessorKey: "lossratio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loss Ratio
          <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
        </Button>
      );
    },
  },
];
