import { Button } from "@/components/ui/button";
import TEMP_TeemoIcon from "@/assets/image/Temp/TeemoIcon.webp";

interface SummonerInfoProps {
  summonerName: string;
  summonerTag: string;
  summonerLevel: number;
}

const SummonerInfo: React.FC<SummonerInfoProps> = ({
  summonerName,
  summonerTag,
  summonerLevel,
}) => {
  return (
    <div className="flex gap-3 justify-start items-center bg-lucian-bg bg-cover bg-center p-4 font-vollkorn md:py-10 md:px-10 md:bg-center">
      {/* Summoner Icon */}
      <img
        src={TEMP_TeemoIcon}
        alt="Teemo"
        className="w-20 rounded-md border md:w-24"
      />

      {/* Summoner info */}
      <div className="flex flex-col">
        <div className="flex items-end space-x-1 mb-0">
          <h1 className="text-xl text-white p-0 m-0 md:text-2xl">
            {summonerName}
          </h1>
          <h3 className="text-base text-white p-0 m-0 align-middle opacity-90 md:opacity-70 md:text-xl">
            #{summonerTag}
          </h3>
        </div>
        <h3 className="text-sm text-white mb-1 md:text-base">
          Level {summonerLevel}
        </h3>
        <Button className="w-24 h-7 bg-[#4377B5] md:w-32">Update</Button>
      </div>
    </div>
  );
};

export default SummonerInfo;
