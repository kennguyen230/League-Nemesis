import { useEffect, useState } from "react";
import axios from "axios";

const LeagueNemesisStatisticsBar = ({ champion }) => {
  const [epithet, setEpithet] = useState("");

  useEffect(() => {
    const fetchChampionData = async () => {
      const url = `https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/champion/${champion.champId}.json`;
      axios
        .get(url)
        .then(function (response) {
          setEpithet(response.data.data[champion.champId].title);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    if (champion) fetchChampionData();
  }, [champion]);

  return (
    <div className="flex mx-4 my-0 text-xs bg-gray-600 rounded-md font-vollkorn font-semibold md:text-lg md:mx-20">
      <div className="bg-gray-600 rounded-l-md p-2 drop-shadow-2xl w-1/4 md:p-4">
        {champion ? (
          <>
            <h1>{champion.champName}</h1>
            <h3 className="opacity-80 text-[.65rem] md:text-base md:opacity-80">
              {epithet}
            </h3>
          </>
        ) : (
          <>
            <p>Champion</p>
            <p>n/a</p>
          </>
        )}
      </div>
      <div className="bg-gray-600 rounded-l-md p-2 drop-shadow-2xl w-1/4 md:p-4">
        <h1>Losses</h1>
        {champion ? (
          <h3 className="text-lg md:text-2xl">{champion.losses}</h3>
        ) : (
          <p>n/a</p>
        )}
      </div>
      <div className="bg-gray-600 rounded-l-md p-2 drop-shadow-2xl w-1/4 md:p-4">
        <h1>Encounters</h1>
        {champion ? (
          <h3 className="text-lg md:text-2xl">{champion.encounters}</h3>
        ) : (
          <p>n/a</p>
        )}
      </div>
      <div className="bg-red-500 rounded-md p-2 drop-shadow-2xl w-1/4 md:p-4">
        <h1>Loss Ratio</h1>
        {champion ? (
          <h3 className="text-lg md:text-2xl">
            {champion.lossRate.toFixed(2)}%
          </h3>
        ) : (
          <p>n/a</p>
        )}
      </div>
    </div>
  );
};

export default LeagueNemesisStatisticsBar;
