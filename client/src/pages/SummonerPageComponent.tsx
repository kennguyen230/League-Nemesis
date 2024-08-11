import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import SummonerInfo from "@/layouts/SummonerPage/SummonerInfo";
import GameTypeBar from "@/layouts/SummonerPage/GameTypeBar";
import LeagueNemesisDisplay from "@/layouts/SummonerPage/LeagueNemesisDisplay";
import LeagueNemesisStatisticsBar from "@/layouts/SummonerPage/LeagueNemesisStatisticsBar";

import { columns } from "@/layouts/SummonerPage/ChampionsColumn";
import { ChampionsTable } from "@/layouts/SummonerPage/ChampionsTable";

import { useState } from "react";

const SummonerPageComponent = (summoner) => {
  const [displayGameMode, setDisplayGameMode] = useState("all");
  const [displayLane, setDisplayLane] = useState("overall");

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
        />

        {/* ie. Normals, ARAM, Ranked, etc */}
        <GameTypeBar></GameTypeBar>

        {/* Front and center picture of LN */}
        <LeagueNemesisDisplay
          champion={
            summoner.summoner.userdata.enemy[displayGameMode][displayLane][0]
          }
          topText={displayGameMode}
          gameCount={summoner.summoner.games.totalGames}
        />

        {/* Statistics correlating to the LN */}
        <LeagueNemesisStatisticsBar
          champion={
            summoner.summoner.userdata.enemy[displayGameMode][displayLane][0]
          }
        />

        {/* Detailed table view of champions based off role */}
        {/* <ChampionsTable columns={columns} data={summoner.summoner.maps} /> */}
      </div>
      <Footer />
    </div>
  );
};

export default SummonerPageComponent;
