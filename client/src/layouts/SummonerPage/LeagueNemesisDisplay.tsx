const LeagueNemesisDisplay = ({ champion, topText, gameCount }) => {
  return (
    <div className="relative mt-4 mb-2 mx-4 font-vollkorn md:mx-20 md:mt-6">
      <img
        src={
          "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
          champion +
          "_0.jpg"
        }
        alt="League Nemesis"
        className="w-full h-auto rounded-md"
      />
      <div className="absolute top-2 left-2 text-white text-sm font-semibold md:text-2xl md:top-4 md:left-4">
        {topText}
      </div>
      <div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-75 text-white text-xs p-2 rounded md:p-5 md:text-base">
        <p>Total Games Polled:</p>
        <p>{gameCount}</p>
      </div>
    </div>
  );
};

export default LeagueNemesisDisplay;
