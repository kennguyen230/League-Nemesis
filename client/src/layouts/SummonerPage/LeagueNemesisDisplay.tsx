const LeagueNemesisDisplay = ({
  src,
  alt,
  topText,
  bottomRightText,
  gameCount,
}) => {
  return (
    <div className="relative m-4 font-vollkorn">
      <img src={src} alt={alt} className="w-full h-auto rounded-2xl" />
      <div className="absolute top-2 left-2 text-white text-sm font-bold">
        {topText}
      </div>
      <div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-75 text-white text-xs p-2 rounded">
        <p>{bottomRightText}</p>
        <p>{gameCount}</p>
      </div>
    </div>
  );
};

export default LeagueNemesisDisplay;
