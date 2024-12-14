import { useEffect, useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { autoSuggestUsers } from "@/data/api";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import RegionSelector from "./RegionSelector";

const SearchBar = ({ height, fontSize, isHomePage }) => {
  // User search bar keyboard input
  const [summonerName, setSummonerName] = useState("");
  // Keeps track of auto suggested users
  const [suggestions, setSuggestions] = useState<User[]>([]);
  // Keeps track of the current region being searched for based off the dropdown menu
  const [region, setRegion] = useState("na");
  // Flag for rendering spinner
  const [isLoading, setIsLoading] = useState(false);
  // Indicates whether the autosuggest dropdown is open
  const [isOpen, setIsOpen] = useState(false);
  // Routes users to this url after hitting enter or Search
  const navigate = useNavigate({ from: "/summoner/$region/$id" });
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  interface User {
    summonerName: string;
    tag: string;
    region: string;
  }

  // Auto suggest api call
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (summonerName.length < 2) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      try {
        const response = await autoSuggestUsers(summonerName, region);
        setSuggestions(response);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceFetch);
  }, [summonerName, region]);

  // Sets state to 'loading', checks for new user for popup,
  // and begins routing to summoner page
  const performSearch = async (name) => {
    setIsLoading(true);

    const encodedSummonerName = name.replace("#", "%23");

    navigate({ to: `/summoner/${region}/${encodedSummonerName}` })
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Navigation error:", error);
        setIsLoading(false);
      });
  };

  // Returns early if already loading a user, otherwise trim the
  // input and check for a tag
  const handleSubmit = async (event) => {
    if (isLoading) {
      return;
    }

    event.preventDefault();
    const trimmedName = summonerName.trim();
    if (!trimmedName || !trimmedName.includes("#")) return;
    await performSearch(trimmedName);
  };

  // For when the user clicks one of the suggested accounts in the
  // auto suggest dropdown. Take the summoner in the row wholesale,
  // close the dropdown, and begin routing
  const handleSuggestionClick = async (event, suggestion) => {
    event.preventDefault();

    const fullName = `${suggestion.summonerName}#${suggestion.tag}`;
    setSummonerName(fullName);
    setIsOpen(false);
    await performSearch(fullName);
  };

  const handleInputChange = (event) => {
    setSummonerName(event.target.value);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`flex ${isHomePage ? "flex-col" : "flex-col md:flex-row"} justify-center items-center gap-1 w-full px-4 md:px-0`}
    >
      <div
        className={`flex min-w-[22rem] max-w-[45rem] w-full mt-4 md:mt-0 ${height} md:px-0 relative drop-shadow-lg z-10`}
      >
        <RegionSelector selectedRegion={region} setSelectedRegion={setRegion} />

        <form onSubmit={handleSubmit} className="w-full flex font-vollkorn">
          <Input
            placeholder="Summoner Name #Tag"
            className={`${fontSize} border-none w-full h-full rounded-none rounded-r-md focus-visible:ring-offset-0 focus-visible:ring-0`}
            onChange={handleInputChange}
            value={summonerName}
          />
        </form>

        {isOpen && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-16 md:left-24 w-full max-w-[18rem] md:max-w-md bg-white border border-gray-200 rounded-md shadow-md overflow-y-auto max-h-48 z-10 no-scrollbar mt-1"
          >
            {suggestions.map((user) => (
              <button
                key={user.summonerName + user.tag}
                onClick={(event) => handleSuggestionClick(event, user)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left font-vollkorn border-b"
                role="menuitem"
              >
                <div className="border rounded-sm inline bg-[#182B40] mr-1">
                  <p className="inline text-white">{user.region}</p>
                </div>
                {user.summonerName} #{user.tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {isHomePage && (
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="hidden sm:block bg-[#182B40] font-vollkorn md:flex md:justify-center md:items-center md:w-28 mt-2 drop-shadow-md hover:bg-slate-900/90 dark:bg-[#11161D]"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Search"}
        </Button>
      )}

      {isLoading && (
        <Loader2
          className={`${isHomePage ? "md:hidden" : "visible"} mt-3 md:mt-0 animate-spin text-white`}
        />
      )}
    </div>
  );
};

export default SearchBar;
