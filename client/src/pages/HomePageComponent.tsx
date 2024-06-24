import HomePageBigLogo from "@/layouts/HomePage/HomePageBigLogo";
import Header from "@/layouts/Header";
import HomePageSearchBar from "@/layouts/HomePage/HomePageSearchBar";

const HomePageComponent = () => {
  return (
    <div className="flex flex-col relative items-center justify-start h-screen overflow-hidden">
      <Header></Header>

      {/* Content of home page */}
      <div className="absolute z-10 flex flex-col items-center justify-center mt-10 w-full">
        <HomePageBigLogo></HomePageBigLogo>
        <HomePageSearchBar></HomePageSearchBar>
      </div>

      {/* Background of home page */}
      <div className="bg-home-page-bg opacity-90 h-full relative bg-right-bottom md:bg-left-top bg-cover w-full blur-xs"></div>
    </div>
  );
};

export default HomePageComponent;
