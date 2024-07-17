import { useEffect, useState } from "react";
import axios from "axios";

const LeagueNemesisStatisticsBar = ({ champion }) => {
  const [epithet, setEpithet] = useState("");

  useEffect(() => {
    const fetchChampionData = async () => {
      const url = `https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/champion/${champion.champion}.json`;
      axios
        .get(url)
        .then(function (response) {
          setEpithet(response.data.data[champion.champion].title);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    fetchChampionData();
  }, [champion.champion]);

  return (
    <div className="flex mx-4 my-0 text-xs bg-[#757575] rounded-md font-vollkorn font-semibold md:text-lg md:mx-20">
      <div className="bg-[#757575] rounded-l-md p-2 drop-shadow-2xl w-1/4 md:p-4">
        <h1>{champion.champion}</h1>
        <h3 className="opacity-75 text-[.65rem] md:text-base md:opacity-70">
          {epithet}
        </h3>
      </div>
      <div className="bg-[#757575] rounded-l-md p-2 drop-shadow-2xl w-1/4 md:p-4">
        <h1>Losses</h1>
        <h3 className="text-lg">{champion.losses}</h3>
      </div>
      <div className="bg-[#757575] rounded-l-md p-2 drop-shadow-2xl w-1/4 md:p-4">
        <h1>Encounters</h1>
        <h3 className="text-lg">{champion.encounters}</h3>
      </div>
      <div className="bg-red-500 rounded-md p-2 drop-shadow-2xl w-1/4 md:p-4">
        <h1>Loss Ratio</h1>
        <h3 className="text-lg">{(champion.lossRatio * 100).toFixed(2)}%</h3>
      </div>
    </div>
  );
};

export default LeagueNemesisStatisticsBar;
