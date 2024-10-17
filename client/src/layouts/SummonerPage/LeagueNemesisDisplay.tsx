const LeagueNemesisDisplay = ({ champion, topText, gameCount }) => {
  return (
    <div className="relative mt-4 mb-2 mx-4 font-vollkorn md:mx-20 md:mt-6">
      {champion ? (
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.champName}_0.jpg`}
          alt="League Nemesis"
          className="w-full h-auto rounded-md"
        />
      ) : (
        <div className="flex justify-center items-center w-full h-52 md:h-96 rounded-md bg-[#757575]">
          <p className="text-white md:text-lg">No data</p>
        </div>
      )}
      <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-75 text-white text-sm p-2 rounded md:px-4 md:text-2xl md:top-4 md:left-4">
        <h1>League Nemesis</h1>
      </div>
      <div className="absolute bottom-16 right-2 bg-gray-900 bg-opacity-75 text-white text-xs p-2 rounded md:bottom-28 md:p-4 md:text-base">
        <h2 className="text-xs font-light md:text-xl">{`${topText}`}</h2>
      </div>
      <div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-75 text-white text-xs p-2 rounded md:p-5 md:text-base">
        <p>Total Games Polled:</p>
        <p>{gameCount}</p>
      </div>
    </div>
  );
};

export default LeagueNemesisDisplay;
