import { Button } from "@/components/ui/button.tsx";
import HomePageBigLogo from "@/layouts/HomePage/HomePageBigLogo";
import Header from "@/layouts/Header";
import HomePageSearchBar from "@/layouts/HomePage/HomePageSearchBar";

const HomePageComponent = () => {
  return (
    <div className="bg-home-page-bg h-screen flex flex-col items-center justify-start bg-center bg-cover lg:bg-top m-0">
      <Header></Header>
      <HomePageBigLogo></HomePageBigLogo>
      <HomePageSearchBar></HomePageSearchBar>
    </div>
  );
};

export default HomePageComponent;
