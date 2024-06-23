import SmallSearchBar from "../SmallSearchBar.tsx";

import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "@tanstack/react-router";

const HomePageSearchBar = () => {
  const [summonerName, setSummonerName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("NA");
  const navigate = useNavigate({ from: "/summoner/$region/$id" });

  // The routing call that moves the user to a specific summoner
  // page. The call is triggered by an keyboard ENTER or when the
  // user hits SEARCH on the screen
  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedSummonerName = summonerName.trim();
    if (trimmedSummonerName === "") {
      return;
    }

    console.log("Searching for summoner: ", trimmedSummonerName);
    console.log("In the region: ", selectedRegion);
    navigate({ to: `/summoner/${selectedRegion}/${trimmedSummonerName}` });
  };

  return (
    <>
      <SmallSearchBar
        summonerName={summonerName}
        setSummonerName={setSummonerName}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        onEnter={handleSubmit}
      ></SmallSearchBar>

      <Button
        onClick={handleSubmit}
        className="hidden sm:block md:w-28 mt-2 bg-[#182B40] font-vollkorn"
      >
        Search
      </Button>
    </>
  );
};

export default HomePageSearchBar;
