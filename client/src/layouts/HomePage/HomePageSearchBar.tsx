import SmallSearchBar from "../SmallSearchBar.tsx";

import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "@tanstack/react-router";

const HomePageSearchBar = () => {
  const [summonerName, setSummonerName] = useState("");
  const [region, setRegion] = useState("");
  const navigate = useNavigate({ from: "/summoner/$id" });

  // The routing call that moves the user to a specific summoner
  // page. The call is triggered by an keyboard ENTER or when the
  // user hits SEARCH on the screen
  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = summonerName.trim();
    console.log("Searching for summoner: ", trimmedName);
    if (trimmedName === "") {
      return;
    }

    navigate({ to: `/summoner/${trimmedName}` });
  };

  return (
    <>
      <SmallSearchBar
        summonerName={summonerName}
        setSummonerName={setSummonerName}
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
