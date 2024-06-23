import RegionSelector from "./RegionSelector";

import { Input } from "@/components/ui/input";

const SmallSearchBar = ({ summonerName, setSummonerName, onEnter }) => {
  const handleInputChange = (event) => {
    setSummonerName(event.target.value);
  };

  return (
    <div className="flex min-w-[22rem] max-w-[45rem] w-full h-12 px-4 md:px-0">
      {/* Region select dropdown */}
      <RegionSelector></RegionSelector>

      {/* Summoner name input */}
      <form onSubmit={onEnter} className="w-full flex font-vollkorn">
        <Input
          placeholder="Summoner Name"
          className="border-none w-full h-full rounded-none rounded-r-md focus-visible:ring-offset-0 focus-visible:ring-0"
          onChange={handleInputChange}
          value={summonerName}
        ></Input>
      </form>
    </div>
  );
};

export default SmallSearchBar;
