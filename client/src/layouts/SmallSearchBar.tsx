import RegionSelector from "./RegionSelector";

import { Input } from "@/components/ui/input";

const SmallSearchBar = () => {
  return (
    <div className="flex min-w-[22rem] max-w-[50rem] w-full px-4 h-12">
      <RegionSelector></RegionSelector>

      {/* Summoner name input */}
      <form action="" className="w-full flex font-vollkorn">
        <Input
          placeholder="Summoner Name"
          className="border-none w-full h-full rounded-none rounded-r-md focus-visible:ring-offset-0 focus-visible:ring-0"
        ></Input>
      </form>
    </div>
  );
};

export default SmallSearchBar;
