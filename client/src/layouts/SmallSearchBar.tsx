import RegionSelector from "./RegionSelector";

import { Input } from "@/components/ui/input";

const SmallSearchBar = ({
  summonerName,
  setSummonerName,
  selectedRegion,
  setSelectedRegion,
  onEnter,
  height,
  fontSize
}) => {
  const handleInputChange = (event) => {
    setSummonerName(event.target.value);
  };

  return (
    <div className={`flex min-w-[22rem] max-w-[45rem] w-full mt-4 md:mt-0 ${height}`}>
      {/* Region select dropdown */}
      <RegionSelector
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />

      {/* Summoner name input */}
      <form onSubmit={onEnter} className="w-full flex font-vollkorn">
        <Input
          placeholder="Summoner Name"
          className={`${fontSize} border-none w-full h-full rounded-none rounded-r-md focus-visible:ring-offset-0 focus-visible:ring-0`}
          onChange={handleInputChange}
          value={summonerName}
        ></Input>
      </form>
    </div>
  );
};

export default SmallSearchBar;
