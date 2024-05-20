const LeagueNemesisStatisticsBar = () => {
  return (
    <div className="flex m-4 text-xs bg-[#757575] rounded-md font-vollkorn">
      <div className="bg-[#757575] rounded-l-md p-2 drop-shadow w-1/4">
        <h1>Sylas</h1>
        <h3 className="opacity-70 text-[.6rem]">The Unshackled</h3>
      </div>
      <div className="bg-[#757575] rounded-l-md p-2 drop-shadow w-1/4">
        <h1>Losses</h1>
        <h3 className="text-lg">8</h3>
      </div>
      <div className="bg-[#757575] rounded-l-md p-2 drop-shadow w-1/4">
        <h1>Encounters</h1>
        <h3 className="text-lg">9</h3>
      </div>
      <div className="bg-red-500 rounded-md p-2 drop-shadow w-1/4">
        <h1>Loss Ratio</h1>
        <h3 className="text-lg">88%</h3>
      </div>
    </div>
  );
};

export default LeagueNemesisStatisticsBar;
