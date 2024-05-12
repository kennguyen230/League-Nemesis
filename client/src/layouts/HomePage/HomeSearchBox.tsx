import HomeSearchBar from "./HomeSearchBar";

const HomeSearchBox = () => {
  return (
    <div className="px-16 py-12 border rounded-[2rem] bg-[#182B40] flex flex-col items-center justify-center">
      <p className="font-vollkorn text-white text-base tracking-wide">
        Seek our your League Nemesis
      </p>
      <p className="font-vollkorn text-white text-2xl tracking-wide">
        Enter your summoner name and region
      </p>
      <hr className="w-[33rem] mt-3 mb-3" />
      <HomeSearchBar></HomeSearchBar>
    </div>
  );
};

export default HomeSearchBox;
