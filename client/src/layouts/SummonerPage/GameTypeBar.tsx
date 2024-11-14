import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const GameTypeBar = ({ summoner, setDisplayGameMode }) => {
  const [activeButton, setActiveButton] = useState("all");

  useEffect(() => {
    setActiveButton("all");
  }, [summoner]);

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
        className={`w-28 min-w-28 h-7 text-s border border-gray-300 md:w-32
          ${activeButton === "all" ? "bg-[#4377B5]" : "bg-gray-400"}`}
      >
        All Matches
      </Button>
      <Button
        id="normals"
        onClick={handleGameModeClick}
        className={`w-28 min-w-28 h-7 text-s border border-gray-300 md:w-32
          ${activeButton === "normals" ? "bg-[#4377B5] " : "bg-gray-400 "}`}
      >
        Normals
      </Button>
      <Button
        id="ranked"
        onClick={handleGameModeClick}
        className={`w-28 min-w-28 h-7 text-s border border-gray-300 md:w-32
          ${activeButton === "ranked" ? "bg-[#4377B5] " : "bg-gray-400 "}`}
      >
        Ranked
      </Button>
      <Button
        id="flex"
        onClick={handleGameModeClick}
        className={`w-28 min-w-28 h-7 text-s border border-gray-300 md:w-32
          ${activeButton === "flex" ? "bg-[#4377B5] " : "bg-gray-400 "}`}
      >
        Flex
      </Button>
      <Button
        id="aram"
        onClick={handleGameModeClick}
        className={`w-28 min-w-28 h-7 text-s border border-gray-300 md:w-32
          ${activeButton === "aram" ? "bg-[#4377B5] " : "bg-gray-400 "}`}
      >
        ARAM
      </Button>
    </div>
  );
};

export default GameTypeBar;
