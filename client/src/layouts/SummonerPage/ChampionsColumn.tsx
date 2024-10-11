import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export type ChampionEntry = {
  champName: string;
  icon: string;
  losses: number;
  encounters: number;
  lossRate: number;
};

export const columns: ColumnDef<ChampionEntry>[] = [
  {
    header: "#",
    accessorKey: "rowNumber",
    cell: ({ row }) => {
      return <div className="text-md">{row.index + 1}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "champName",
    header: "Champion",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-2 mr-10 md:mr-0 md:gap-3 w-2/3">
          <img
            src={
              "https://ddragon.leagueoflegends.com/cdn/14.15.1/img/champion/" +
              row.getValue("champName") +
              ".png"
            }
            alt="Icon"
            className="w-10 rounded-md"
          />
          <div className="text-md">{row.getValue("champName")}</div>
        </div>
      );
    },
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
      return (
        <div className="text-center md:w-1/2 text-lg">
          {row.getValue("losses")}
        </div>
      );
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
    cell: ({ row }) => {
      return (
        <div className="text-center md:w-1/2 text-lg">
          {row.getValue("encounters")}
        </div>
      );
    },
  },
  {
    accessorKey: "lossRate",
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
    cell: ({ row }) => {
      return (
        <div className="text-center md:w-1/2 text-lg">
          {row.getValue("lossRate").toFixed(2)}%
        </div>
      );
    },
  },
];
