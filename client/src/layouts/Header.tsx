import LNLogoSmall from "@/assets/image/LNLogoSmall.png";
import SmallSearchBar from "./SmallSearchBar";

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const Header = ({ isSearchBar }) => {
  const [summonerName, setSummonerName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("NA");
  const navigate = useNavigate({ from: "/summoner/$region/$id" });

  const handleSubmit = (event) => {
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
    <header className="flex flex-col md:flex-row sticky top-0 bg-[#11161D] py-4 px-6 justify-between items-center w-full z-50 shadow-lg">
      <div className="flex justify-between items-center w-full md:w-auto">
        {/* Top left logo */}
        <Link to="/">
          <img src={LNLogoSmall} alt="" className="w-20 md:w-28" />
        </Link>

        {/* Top right hamburger menu for small screens */}
        <button className="md:hidden">
          <i
            className="fa-solid fa-bars fa-xl"
            style={{ color: "#ffffff" }}
          ></i>
        </button>
      </div>

      {/* Optionally passed in search bar, centered on smaller screens */}
      {isSearchBar && (
        <SmallSearchBar
          summonerName={summonerName}
          setSummonerName={setSummonerName}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          onEnter={handleSubmit}
          height="h-10" // Corrected class name
          fontSize="text-xs"
        />
      )}

      {/* Top right hamburger menu for large screens */}
      <button className="hidden md:block">
        <i className="fa-solid fa-bars fa-xl" style={{ color: "#ffffff" }}></i>
      </button>
    </header>
  );
};

export default Header;
