import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const GameTypeBar = ({ summoner, setDisplayGameMode }) => {
  const [activeButton, setActiveButton] = useState("all");

  useEffect(() => {
    setActiveButton("all");
  }, [summoner.name]);

  function handleGameModeClick(e) {
    const gameMode = e.target.id;
    setActiveButton(gameMode);
    setDisplayGameMode(gameMode); // Update the game mode
  }

  return (
    <div className="flex bg-gray-600 font-vollkorn overflow-x-auto whitespace-nowrap text-white">
      <Button
        id="all"
        onClick={handleGameModeClick}
        className={`w-28 min-w-28 h-7 text-s border border-gray-300 md:w-32 dark:text-white
          ${activeButton === "all" ? "bg-[#4377B5] dark:bg-[#4377B5] dark:hover:bg-transparent" : "bg-gray-400 dark:bg-gray-400 dark:hover:bg-transparent"} `}
      >
        All Matches
      </Button>
      <Button
        id="normals"
        onClick={handleGameModeClick}
        className={`w-28 min-w-28 h-7 text-s border border-gray-300 md:w-32 dark:text-white
          ${activeButton === "normals" ? "bg-[#4377B5] dark:bg-[#4377B5] dark:hover:bg-transparent" : "bg-gray-400 dark:bg-gray-400 dark:hover:bg-transparent"} `}
      >
        Normals
      </Button>
      <Button
        id="ranked"
        onClick={handleGameModeClick}
        className={`w-28 min-w-28 h-7 text-s border border-gray-300 md:w-32 dark:text-white
          ${activeButton === "ranked" ? "bg-[#4377B5] dark:bg-[#4377B5] dark:hover:bg-transparent" : "bg-gray-400 dark:bg-gray-400 dark:hover:bg-transparent"} `}
      >
        Ranked
      </Button>
      <Button
        id="flex"
        onClick={handleGameModeClick}
        className={`w-28 min-w-28 h-7 text-s border border-gray-300 md:w-32 dark:text-white
          ${activeButton === "flex" ? "bg-[#4377B5] dark:bg-[#4377B5] dark:hover:bg-transparent" : "bg-gray-400 dark:bg-gray-400 dark:hover:bg-transparent"} `}
      >
        Flex
      </Button>
      <Button
        id="aram"
        onClick={handleGameModeClick}
        className={`w-28 min-w-28 h-7 text-s border border-gray-300 md:w-32 dark:text-white
          ${activeButton === "aram" ? "bg-[#4377B5] dark:bg-[#4377B5] dark:hover:bg-transparent" : "bg-gray-400 dark:bg-gray-400 dark:hover:bg-transparent"} `}
      >
        ARAM
      </Button>
    </div>
  );
};

export default GameTypeBar;
