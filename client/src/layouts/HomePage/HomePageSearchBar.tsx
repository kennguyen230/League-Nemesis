import SmallSearchBar from "../SmallSearchBar.tsx";

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";

const HomePageSearchBar = () => {
  const [summonerName, setSummonerName] = useState("");

  const handleSearch = () => {
    console.log("Searching for summoner: ", summonerName);
  };

  return (
    <>
      <SmallSearchBar
        summonerName={summonerName}
        setSummonerName={setSummonerName}
      ></SmallSearchBar>

      <Link to="/summoner/$id" params={{ id: summonerName }}>
        <Button
          onClick={handleSearch}
          className="hidden sm:block md:w-28 mt-2 bg-[#182B40] font-vollkorn hover:bg-[#182B40]/95"
        >
          Search
        </Button>
      </Link>
    </>
  );
};

export default HomePageSearchBar;
