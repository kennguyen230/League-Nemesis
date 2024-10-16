import { Button } from "@/components/ui/button";

interface SummonerInfoProps {
  summonerName: string;
  summonerTag: string;
  summonerLevel: number;
  summonerIcon: string;
  mostPlayedChampion: string;
}

const SummonerInfo: React.FC<SummonerInfoProps> = ({
  summonerName,
  summonerTag,
  summonerLevel,
  summonerIcon,
  mostPlayedChampion,
}) => {
  const championSplashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${mostPlayedChampion}_0.jpg`;

  return (
    <div
      className="relative bg-cover bg-center p-16 font-vollkorn md:p-20 md:bg-center"
      style={{ backgroundImage: `url(${championSplashUrl})` }}
    >
      <div className="absolute flex gap-3 justify start items-center top-4 left-2 bg-gray-900 bg-opacity-75 text-white py-2 pl-2 pr-6 rounded md:gap-6 md:py-4 md:pl-4 md:pr-24 md:text-2xl md:top-4 md:left-4">
        {/* Summoner Icon */}
        <img
          src={summonerIcon}
          alt="summonerIcon"
          className="w-16 rounded-md border md:w-24"
        />

        {/* Summoner info */}
        <div className="flex flex-col">
          <div className="flex items-end space-x-1 mb-0">
            <h1 className="text-l text-white p-0 m-0 md:text-2xl">
              {summonerName}
            </h1>
            <h3 className="text-sm text-white p-0 m-0 align-middle opacity-90 md:opacity-70 md:text-xl">
              #{summonerTag.toUpperCase()}
            </h3>
          </div>
          <h3 className="text-sm text-white mb-1 md:text-base">
            Level {summonerLevel}
          </h3>
          <Button className="w-20 h-7 bg-[#4377B5] md:w-32">Update</Button>
        </div>
      </div>
    </div>
  );
};

export default SummonerInfo;
