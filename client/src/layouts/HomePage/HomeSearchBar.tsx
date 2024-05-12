import { Input } from "../../components/ui/input";

const HomeSearchBar = () => {
  return (
    <div className="flex bg-white w-[33rem] gap-4 rounded-2xl p-2 font-vollkorn">
      {/* Region selector */}
      <div className="flex flex-col border-r-2 w-28 pr-2">
        <small className="pl-1 text-xs">Region</small>
        <select name="" id="na" className="opacity-50 text-s">
          <option value="na">NA</option>
          <option value="euw">EUW</option>
          <option value="eune">EUNE</option>
        </select>
      </div>
      {/* Summoner name entry */}
      <div className="flex flex-col">
        <small className="text-xs">Search</small>
        <Input
          placeholder="Summoner Name"
          className="rounded-sm min-w-[350px] max-w-[700px] focus-visible:ring-transparent font-vollkorn text-s p-0 m-0"
        ></Input>
      </div>
    </div>
  );
};

export default HomeSearchBar;
