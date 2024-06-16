import { Button } from "@/components/ui/button";
import TEMP_TeemoIcon from "../../assets/image/Temp/TeemoIcon.webp";

const SummonerInfo = () => {
  return (
    <div className="flex gap-3 justify-start items-center bg-lucian-bg bg-cover bg-center p-4 font-vollkorn lg:py-10 lg:px-10 lg:bg-center">
      {/* Summoner Icon */}
      <img
        src={TEMP_TeemoIcon}
        alt="Teemo"
        className="w-20 rounded-lg border lg:w-24"
      />

      {/* Summoner info */}
      <div className="flex flex-col">
        <div className="flex items-end space-x-1 mb-0">
          <h1 className="text-xl text-white p-0 m-0 lg:text-2xl">Off Season</h1>
          <h3 className="text-base text-white p-0 m-0 align-middle opacity-90 lg:opacity-70 lg:text-xl">
            #NA1
          </h3>
        </div>
        <h3 className="text-sm text-white mb-1 lg:text-base">Level 350</h3>
        <Button className="w-24 h-7 bg-[#4377B5] lg:w-32">Update</Button>
      </div>
    </div>
  );
};

export default SummonerInfo;
