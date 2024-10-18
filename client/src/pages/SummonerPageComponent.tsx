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
    window.scrollTo(0, 0);
  }, [summoner]);

  // Shorthand aliases to save on typing
  const userData = summoner.summoner.userdata.user;
  const enemyData = summoner.summoner.userdata.enemy;

  // Tracks user's most played champion in every mode
  const mostPlayedChampion =
    displayGameMode === "aram"
      ? userData[displayGameMode]?.[0]?.champId
      : userData[displayGameMode]?.[displayLane]?.[0]?.champId;

  // Tracks user's LN champion in every mode
  const enemyChampionData =
    displayGameMode === "aram"
      ? enemyData?.[displayGameMode] ?? []
      : enemyData?.[displayGameMode]?.[displayLane] ?? [];

  // Safely access the first champion if it exists
  const leagueNemesisChampion = enemyChampionData[0] ?? null;

  // Tracks user's game count in every mode
  const gameCount =
    displayGameMode === "all"
      ? summoner.summoner.games.totalGames
      : summoner.summoner.games[displayGameMode];

  return (
    <div className="bg-summoner-page-bg bg-contain h-full">
      <Header isSearchBar={true} />

      <div className="h-full bg-[#182B40] bg-center md:mx-64 pb-10">
        {/* Summoner info at the top of the page */}
        {mostPlayedChampion ? (
          <SummonerInfo
            summonerName={summoner.summoner.name}
            summonerTag={summoner.summoner.tag}
            summonerLevel={summoner.summoner.level}
            summonerIcon={summoner.summoner.icon}
            mostPlayedChampion={mostPlayedChampion}
          />
        ) : (
          <SummonerInfo
            summonerName={summoner.summoner.name}
            summonerTag={summoner.summoner.tag}
            summonerLevel={summoner.summoner.level}
            summonerIcon={summoner.summoner.icon}
            mostPlayedChampion={userData["all"]["overall"][0]}
          />
        )}

        {/* ie. Normals, ARAM, Ranked, etc */}
        <GameTypeBar
          summoner={summoner}
          setDisplayGameMode={setDisplayGameMode}
        />

        {/* Front and center picture of LN */}
        <LeagueNemesisDisplay
          champion={leagueNemesisChampion}
          topText={displayGameMode}
          gameCount={gameCount}
        />

        {/* Statistics correlating to the LN */}
        <LeagueNemesisStatisticsBar champion={leagueNemesisChampion} />

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
