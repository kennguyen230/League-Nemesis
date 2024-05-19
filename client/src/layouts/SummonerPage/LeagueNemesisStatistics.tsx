const LeagueNemesisStatistics = ({
  name,
  title,
  losses,
  encounters,
  lossRatio,
}) => {
  return (
    <div className="flex w-full max-w-xl shadow-md rounded overflow-hidden">
      <div className="bg-gray-800 text-white p-4 flex flex-col justify-center">
        <h2 className="font-bold">{name}</h2>
        <p>{title}</p>
      </div>
      <div className="bg-gray-700 text-white p-4 flex-1 flex items-center justify-center">
        <div>
          <p className="text-center font-bold">Losses</p>
          <p className="text-center">{losses}</p>
        </div>
      </div>
      <div className="bg-gray-600 text-white p-4 flex-1 flex items-center justify-center">
        <div>
          <p className="text-center font-bold">Encounters</p>
          <p className="text-center">{encounters}</p>
        </div>
      </div>
      <div className="bg-red-500 text-white p-4 flex-1 flex items-center justify-center">
        <div>
          <p className="text-center font-bold">Loss Ratio</p>
          <p className="text-center">{lossRatio}</p>
        </div>
      </div>
    </div>
  );
};

export default LeagueNemesisStatistics;
