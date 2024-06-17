import { Button } from "@/components/ui/button.tsx";
import SmallSearchBar from "@/layouts/SmallSearchBar.tsx";
import Header from "@/layouts/Header";

import HomePageLogo from "@/assets/image/HomePageLogo.png";

const HomePage = () => {
  return (
    <div className="bg-home-page-bg h-screen flex flex-col items-center justify-start bg-center bg-cover lg:bg-top m-0">
      <Header></Header>
      <img
        src={HomePageLogo}
        alt="HomePageLogo"
        className="mt-48 mb-4 lg:mt-64"
      />
      <SmallSearchBar></SmallSearchBar>
      <Button className="hidden md:block lg:w-28 mt-2 bg-[#182B40]">
        Search
      </Button>
    </div>
  );
};

export default HomePage;
