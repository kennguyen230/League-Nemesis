import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import SummonerInfo from "@/layouts/SummonerPage/SummonerInfo";
import GameTypeBar from "@/layouts/SummonerPage/GameTypeBar";
import LeagueNemesisDisplay from "@/layouts/SummonerPage/LeagueNemesisDisplay";
import LeagueNemesisStatisticsBar from "@/layouts/SummonerPage/LeagueNemesisStatisticsBar";

import { columns } from "@/layouts/SummonerPage/ChampionsColumn";
import { ChampionsTable } from "@/layouts/SummonerPage/ChampionsTable";

import { useState, useEffect } from "react";
import { useSummonerPolling } from "@/data/queryHooks";
import NewUserModal from "@/layouts/NewUserModal";
import DialogPopup from "@/layouts/DialogPopup";

const SummonerPageComponent = (summoner) => {
  const [localSummoner, setLocalSummoner] = useState(summoner.summoner);
  const [displayGameMode, setDisplayGameMode] = useState("all");
  const [displayLane, setDisplayLane] = useState("overall");
  const [newUser, setNewUser] = useState(false);

  // Whenever the user searches for a new summoner,
  // reset the useStates back to default
  useEffect(() => {
    // Avoid unnecessary updates
    if (localSummoner !== summoner.summoner) {
      setLocalSummoner(summoner.summoner);
      setDisplayGameMode("all");
      setDisplayLane("overall");
      window.scrollTo(0, 0);
    }
  }, [summoner]);

  // Responsible for displaying the popup when the user is
  // searching for a new summoner that does not exist in the
  // database
  useEffect(() => {
    if (
      !localSummoner ||
      (!localSummoner.games?.totalGames && localSummoner.state != "ready")
    ) {
      setNewUser(true);
    } else {
      setNewUser(false);
    }
  }, [localSummoner]);

  useSummonerPolling(
    `${localSummoner.name}#${localSummoner.tag}`,
    localSummoner.region,
    localSummoner.state,
    (newSummoner) => {
      if (newSummoner !== localSummoner) {
        setLocalSummoner(newSummoner);
      }
    }
  );

  document.title = `${localSummoner.name}#${localSummoner.tag} - League Nemesis`;

  // Shorthand aliases to save on typing
  const userData = localSummoner.userdata?.user;
  const enemyData = localSummoner.userdata?.enemy;

  // If the selected display gamemode is aram and the data for it exists,
  // then set the displaying array to it, otherwise set it to an empty array.
  // If aram wasn't selected set the displaying array to the specific
  // gamemode & lane only if the data exists, otherwise set it to an empty array
  const userChampionData =
    displayGameMode === "aram"
      ? userData?.[displayGameMode] ?? []
      : userData?.[displayGameMode]?.[displayLane] ?? [];

  // Safely access the most played champion by a user
  const mostPlayedChampion = userChampionData[0]?.champId ?? null;

  // Same idea as userChampionData but tracks enemy data
  const enemyChampionData =
    displayGameMode === "aram"
      ? enemyData?.[displayGameMode] ?? []
      : enemyData?.[displayGameMode]?.[displayLane] ?? [];

  // Safely access the most lost against champion aka the League Nemesis
  const leagueNemesisChampion = enemyChampionData[0] ?? null;

  // Tracks user's game count in every mode if the data is available
  const gameCount =
    displayGameMode === "all"
      ? localSummoner.games?.totalGames || 0
      : localSummoner.games?.[displayGameMode] || 0;

  return (
    <div className="bg-summoner-page-bg bg-contain h-full">
      <Header showSearchBar={true} />

      <div className="h-full bg-gradient-to-r from-[#182B40] from-20% to-neutral-900 md:mx-64 pb-10">
        {/* Summoner info at the top of the page */}
        <SummonerInfo
          summonerName={localSummoner.name}
          summonerTag={localSummoner.tag}
          summonerLevel={localSummoner.level}
          summonerIcon={localSummoner.icon}
          mostPlayedChampion={mostPlayedChampion}
        />

        {/* ie. Normals, ARAM, Ranked, etc */}
        <GameTypeBar
          summoner={localSummoner} // When this value changes it resets GameTypeBar back to default values
          setDisplayGameMode={setDisplayGameMode}
        />

        {/* Front and center picture of LN */}
        <LeagueNemesisDisplay
          champion={leagueNemesisChampion}
          topText={displayGameMode}
          gameCount={gameCount}
        />

        {/* Statistics related to the LN */}
        <LeagueNemesisStatisticsBar champion={leagueNemesisChampion} />

        {/* Detailed table of champions based off the lane selected */}
        <ChampionsTable
          columns={columns}
          data={enemyChampionData}
          setDisplayLane={setDisplayLane}
        />

        <DialogPopup isOpen={newUser} setIsOpen={setNewUser}>
          <NewUserModal></NewUserModal>
        </DialogPopup>
      </div>
      <Footer />
    </div>
  );
};

export default SummonerPageComponent;
