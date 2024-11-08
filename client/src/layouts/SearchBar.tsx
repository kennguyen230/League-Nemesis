import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

import { checkNewUser } from "@/data/api";
import { Loader2 } from "lucide-react";

import DialogPopup from "./DialogPopup";
import NewUserModal from "./NewUserModal";
import RegionSelector from "./RegionSelector";
import { Input } from "@/components/ui/input";

const SearchBar = ({
  height,
  fontSize,
  isHomePage,
}: {
  height: string;
  fontSize: string;
  isHomePage: boolean;
}) => {
  const [summonerName, setSummonerName] = useState("");
  const [region, setRegion] = useState("NA");
  const [isLoading, setIsLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate({ from: "/summoner/$region/$id" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Return if empty string
    setSummonerName(summonerName.trim());
    if (summonerName === "") return;

    // Return if no tag
    const encodedSummonerName = summonerName.replace("#", "%23");
    if (encodedSummonerName === summonerName) return;

    // Trigger loading spinner
    setIsLoading(true);

    console.log("Searching for summoner: ", encodedSummonerName);
    console.log("In the region: ", region);

    // Check to see if the user exists in the db, if not
    // then render a modal for new users
    const newUser = await checkNewUser(region, summonerName);
    if (newUser) setIsNew(true);

    navigate({ to: `/summoner/${region}/${encodedSummonerName}` });
  };

  const handleInputChange = (event) => {
    setSummonerName(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full px-4 md:px-0">
      {/* Actual search bar */}
      <div
        className={`flex min-w-[22rem] max-w-[45rem] w-full mt-4 md:mt-0 ${height} md:px-0`}
      >
        <RegionSelector selectedRegion={region} setSelectedRegion={setRegion} />

        <form onSubmit={handleSubmit} className="w-full flex font-vollkorn">
          <Input
            placeholder="Summoner Name"
            className={`${fontSize} border-none w-full h-full rounded-none rounded-r-md focus-visible:ring-offset-0 focus-visible:ring-0`}
            onChange={handleInputChange}
            value={summonerName}
          />
        </form>
      </div>

      {/* Displays a Search button. Only for the home page */}
      {isHomePage && (
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="hidden sm:block bg-[#182B40] font-vollkorn md:flex md:justify-center md:items-center md:w-28 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            "Search"
          )}
        </Button>
      )}

      {/* Displays a loading spinner on mobile */}
      {isLoading && (
        <Loader2 className="md:hidden animate-spin text-white mt-3"></Loader2>
      )}

      <DialogPopup isOpen={isNew} setIsOpen={setIsNew} title={""}>
        <NewUserModal></NewUserModal>
      </DialogPopup>
    </div>
  );
};

export default SearchBar;
