import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export type ChampionEntry = {
  champion: string;
  icon: string;
  losses: number;
  encounters: number;
  lossRatio: number;
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
    accessorKey: "champion",
    header: "Champion",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-2 md:gap-3 w-2/3">
          <img
            src={
              "https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/" +
              row.getValue("champion") +
              ".png"
            }
            alt="Icon"
            className="w-10 rounded-md"
          />
          <div className="text-md">{row.getValue("champion")}</div>
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
    accessorKey: "lossRatio",
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
          {row.getValue("lossRatio").toFixed(2) * 100}%
        </div>
      );
    },
  },
];
