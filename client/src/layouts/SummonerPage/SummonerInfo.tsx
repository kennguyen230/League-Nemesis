import { Button } from "@/components/ui/button";
import TEMP_TeemoIcon from "../../assets/image/Temp/TeemoIcon.webp";

const SummonerInfo = () => {
  return (
    <div className="flex gap-3 justify-start items-center bg-lucian-bg bg-cover bg-center p-6 font-vollkorn">
      {/* Summoner Icon */}
      <img src={TEMP_TeemoIcon} alt="Teemo" className="w-20 rounded-lg" />

      {/* Summoner info */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-1">
          <h1 className="text-xl text-white p-0 m-0">Off Season</h1>
          <h3 className="text-xs text-white p-0 m-0 align-middle">#NA1</h3>
        </div>
        <h3 className="text-sm text-white mb-1">Level 350</h3>
        <Button className="w-24 h-7 bg-[#4377B5]">Update</Button>
      </div>
    </div>
  );
};

export default SummonerInfo;
