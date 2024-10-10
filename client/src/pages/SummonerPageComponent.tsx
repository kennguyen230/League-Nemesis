import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import SummonerInfo from "@/layouts/SummonerPage/SummonerInfo";
import GameTypeBar from "@/layouts/SummonerPage/GameTypeBar";
import LeagueNemesisDisplay from "@/layouts/SummonerPage/LeagueNemesisDisplay";
import LeagueNemesisStatisticsBar from "@/layouts/SummonerPage/LeagueNemesisStatisticsBar";

import { columns } from "@/layouts/SummonerPage/ChampionsColumn";
import { ChampionsTable } from "@/layouts/SummonerPage/ChampionsTable";

import { useState, useEffect } from "react";

const SummonerPageComponent = (summoner) => {
  const [displayGameMode, setDisplayGameMode] = useState("all");
  const [displayLane, setDisplayLane] = useState("overall");

  console.log(displayGameMode);
  console.log(displayLane);

  // Whenever the user searches for a new summoner,
  // reset the useStates back to default
  useEffect(() => {
    setDisplayGameMode("all");
    setDisplayLane("overall");
  }, [summoner]);

  return (
    <div className="bg-summoner-page-bg bg-contain h-full">
      <Header isSearchBar={true}></Header>

      <div className="h-full bg-[#182B40] bg-center md:mx-64 pb-10">
        {/* Summoner info at the top of the page */}
        <SummonerInfo
          summonerName={summoner.summoner.name}
          summonerTag={summoner.summoner.tag}
          summonerLevel={summoner.summoner.level}
          summonerIcon={summoner.summoner.icon}
          mostPlayedChampion={
            displayGameMode === "aram"
              ? summoner.summoner.userdata.user[displayGameMode][0].champName
              : summoner.summoner.userdata.user[displayGameMode]["overall"][0]
                  .champName
          }
        />

        {/* ie. Normals, ARAM, Ranked, etc */}
        <GameTypeBar
          summoner={summoner}
          setDisplayGameMode={setDisplayGameMode}
        ></GameTypeBar>

        {/* Front and center picture of LN */}
        <LeagueNemesisDisplay
          champion={
            displayGameMode === "aram"
              ? summoner.summoner.userdata.enemy[displayGameMode][0]
              : summoner.summoner.userdata.enemy[displayGameMode][
                  displayLane
                ][0]
          }
          topText={displayGameMode}
          gameCount={
            displayGameMode === "all"
              ? summoner.summoner.games.totalGames
              : summoner.summoner.games[displayGameMode]
          }
        />

        {/* Statistics correlating to the LN */}
        <LeagueNemesisStatisticsBar
          champion={
            displayGameMode === "aram"
              ? summoner.summoner.userdata.enemy[displayGameMode][0]
              : summoner.summoner.userdata.enemy[displayGameMode][
                  displayLane
                ][0]
          }
        />

        {/* Detailed table view of champions based off role */}
        <ChampionsTable
          columns={columns}
          data={
            displayGameMode === "aram"
              ? summoner.summoner.userdata.enemy[displayGameMode]
              : summoner.summoner.userdata.enemy[displayGameMode][displayLane]
          }
          setDisplayLane={setDisplayLane}
        />
      </div>
      <Footer />
    </div>
  );
};

export default SummonerPageComponent;
