import SmallSearchBar from "../SmallSearchBar.tsx";

import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "@tanstack/react-router";

import { Loader2 } from "lucide-react";

const HomePageSearchBar = () => {
  const [summonerName, setSummonerName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("NA");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate({ from: "/summoner/$region/$id" });

  // The routing call that moves the user to a specific summoner
  // page. The call is triggered by an keyboard ENTER or when the
  // user hits SEARCH on the screen
  const handleSubmit = (event) => {
    event.preventDefault();

    // Changes the search button to a loading state after
    // the user hits enter
    setLoading(true);

    // Return if text field is empty and user hits search
    const trimmedSummonerName = summonerName.trim();
    if (trimmedSummonerName === "") {
      return;
    }

    // If no '#' exists in the entry then no tag
    const encodedSummonerName = trimmedSummonerName.replace("#", "%23");
    if (encodedSummonerName === trimmedSummonerName) {
      return;
    }

    console.log("Searching for summoner: ", encodedSummonerName);
    console.log("In the region: ", selectedRegion);
    navigate({ to: `/summoner/${selectedRegion}/${encodedSummonerName}` });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full px-4 md:px-0">
      <SmallSearchBar
        summonerName={summonerName}
        setSummonerName={setSummonerName}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        onEnter={handleSubmit}
        height="h-12"
        fontSize="text-sm"
      ></SmallSearchBar>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="hidden sm:block bg-[#182B40] font-vollkorn md:flex md:justify-center md:items-center md:w-28 mt-2"
      >
        {loading ? (
          <>
            <Loader2 className=" animate-spin" />
          </>
        ) : (
          "Search"
        )}
      </Button>
    </div>
  );
};

export default HomePageSearchBar;
