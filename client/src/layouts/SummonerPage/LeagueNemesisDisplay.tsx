const LeagueNemesisDisplay = ({
  src,
  alt,
  topText,
  bottomRightText,
  gameCount,
}) => {
  return (
    <div className="relative mt-4 mb-2 mx-4 font-vollkorn lg:mx-20 lg:mt-6">
      <img src={src} alt={alt} className="w-full h-auto rounded-lg" />
      <div className="absolute top-2 left-2 text-white text-sm font-semibold lg:text-2xl lg:top-4 lg:left-4">
        {topText}
      </div>
      <div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-75 text-white text-xs p-2 rounded lg:p-5 lg:text-base">
        <p>{bottomRightText}</p>
        <p>{gameCount}</p>
      </div>
    </div>
  );
};

export default LeagueNemesisDisplay;
