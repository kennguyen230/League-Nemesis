import HomePageBigLogo from "@/layouts/HomePage/HomePageBigLogo";
import Header from "@/layouts/Header";
import SearchBar from "@/layouts/SearchBar";

const HomePageComponent = () => {
  document.title = "League Nemesis";
  return (
    <div className="flex flex-col relative items-center justify-start h-screen overflow-hidden bg-[#000000]">
      <Header showSearchBar={false} />

      {/* Content of home page */}
      <div className="absolute z-10 flex flex-col items-center justify-center mt-14 md:mt-24 w-full">
        <HomePageBigLogo />
        {/* <HomePageSearchBar></HomePageSearchBar> */}
        <SearchBar height="h-12" fontSize="text-sm" isHomePage={true} />
      </div>

      {/* Background of home page */}
      <div className="bg-home-page-bg opacity-65 h-full relative bg-right-bottom md:bg-left-top bg-cover w-full"></div>
    </div>
  );
};

export default HomePageComponent;
