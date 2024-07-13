const LeagueNemesisStatisticsBar = ({ champion }) => {
  return (
    <div className="flex mx-4 my-0 text-xs bg-[#757575] rounded-md font-vollkorn font-semibold md:text-lg md:mx-20">
      <div className="bg-[#757575] rounded-l-md p-2 drop-shadow-2xl w-1/4 md:p-4">
        <h1>{champion.champion}</h1>
        <h3 className="opacity-75 text-[.65rem] md:text-base md:opacity-70">
          The Unshackled
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
        <h3 className="text-lg">{champion.lossRatio.toFixed(2) * 100}%</h3>
      </div>
    </div>
  );
};

export default LeagueNemesisStatisticsBar;
