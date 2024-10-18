import LNLogoSmall from "@/assets/image/LNLogoSmall.png";
import SmallSearchBar from "./SmallSearchBar";

import { HamburgerMenu } from "./HamburgerMenu";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const Header: React.FC<{ isSearchBar: boolean }> = ({ isSearchBar }) => {
  const [summonerName, setSummonerName] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("na");
  const navigate = useNavigate({ from: "/summoner/$region/$id" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSummonerName = summonerName.trim();
    if (trimmedSummonerName === "") {
      return;
    }

    const encodedSummonerName = trimmedSummonerName.replace("#", "%23");
    if (encodedSummonerName === trimmedSummonerName) {
      return;
    }

    console.log("Searching for summoner: ", encodedSummonerName);
    console.log("In the region: ", selectedRegion);
    navigate({ to: `/summoner/${selectedRegion}/${encodedSummonerName}` });
  };

  /**
   * The way the responsive header works is: For small screen sizes make
   * it a flex-col and med and above screen size have it be flex row.
   * Then, toggle between which hamburger menu is hidden.
   */
  return (
    <header className="flex flex-col md:flex-row sticky top-0 bg-[#11161D] p-4 justify-between items-center w-full z-50 shadow-lg">
      <div className="flex justify-between items-center w-full md:w-auto">
        {/* Top left logo */}
        <Link to="/">
          <img src={LNLogoSmall} alt="" className="w-20 ml-1 md:w-28" />
        </Link>

        {/* Top right hamburger menu for small screens */}
        <div className="md:hidden">
          <HamburgerMenu></HamburgerMenu>
        </div>
      </div>

      {/* Optionally passed in search bar, centered on smaller screens */}
      {isSearchBar && (
        <SmallSearchBar
          summonerName={summonerName}
          setSummonerName={setSummonerName}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          onEnter={handleSubmit}
          height="h-10"
          fontSize="text-xs"
        />
      )}

      {/* Top right hamburger menu for large screens */}
      <div className="hidden md:block">
        <HamburgerMenu></HamburgerMenu>
      </div>
    </header>
  );
};

export default Header;
