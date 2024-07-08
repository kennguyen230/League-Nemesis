import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import SmallSearchBar from "@/layouts/SmallSearchBar";
import SummonerInfo from "@/layouts/SummonerPage/SummonerInfo";
import GameTypeBar from "@/layouts/SummonerPage/GameTypeBar";
import LeagueNemesisDisplay from "@/layouts/SummonerPage/LeagueNemesisDisplay";
import LeagueNemesisStatisticsBar from "@/layouts/SummonerPage/LeagueNemesisStatisticsBar";

import { ChampionEntry, columns } from "@/layouts/SummonerPage/ChampionsColumn";
import { ChampionsTable } from "@/layouts/SummonerPage/ChampionsTable";

// Temp fake data
const championEntry: ChampionEntry[] = [
  {
    champion: "Sylas",
    icon: "icon",
    losses: 1,
    encounters: 10,
    lossratio: 0.1,
  },
  {
    champion: "Teemo",
    icon: "icon",
    losses: 2,
    encounters: 9,
    lossratio: 0.2,
  },
  {
    champion: "Shivana",
    icon: "icon",
    losses: 3,
    encounters: 8,
    lossratio: 0.3,
  },
  {
    champion: "Sylas",
    icon: "icon",
    losses: 1,
    encounters: 10,
    lossratio: 0.1,
  },
  {
    champion: "Teemo",
    icon: "icon",
    losses: 2,
    encounters: 9,
    lossratio: 0.2,
  },
  {
    champion: "Shivana",
    icon: "icon",
    losses: 3,
    encounters: 8,
    lossratio: 0.3,
  },
  {
    champion: "Sylas",
    icon: "icon",
    losses: 1,
    encounters: 10,
    lossratio: 0.1,
  },
  {
    champion: "Teemo",
    icon: "icon",
    losses: 2,
    encounters: 9,
    lossratio: 0.2,
  },
  {
    champion: "Shivana",
    icon: "icon",
    losses: 3,
    encounters: 8,
    lossratio: 0.3,
  },
  {
    champion: "Sylas",
    icon: "icon",
    losses: 1,
    encounters: 10,
    lossratio: 0.1,
  },
  {
    champion: "Teemo",
    icon: "icon",
    losses: 2,
    encounters: 9,
    lossratio: 0.2,
  },
  {
    champion: "Shivana",
    icon: "icon",
    losses: 3,
    encounters: 8,
    lossratio: 0.3,
  },
  {
    champion: "Sylas",
    icon: "icon",
    losses: 1,
    encounters: 10,
    lossratio: 0.1,
  },
  {
    champion: "Teemo",
    icon: "icon",
    losses: 2,
    encounters: 9,
    lossratio: 0.2,
  },
  {
    champion: "Shivana",
    icon: "icon",
    losses: 3,
    encounters: 8,
    lossratio: 0.3,
  },
  {
    champion: "Sylas",
    icon: "icon",
    losses: 1,
    encounters: 10,
    lossratio: 0.1,
  },
  {
    champion: "Teemo",
    icon: "icon",
    losses: 2,
    encounters: 9,
    lossratio: 0.2,
  },
  {
    champion: "Shivana",
    icon: "icon",
    losses: 3,
    encounters: 8,
    lossratio: 0.3,
  },
  {
    champion: "Sylas",
    icon: "icon",
    losses: 1,
    encounters: 10,
    lossratio: 0.1,
  },
  {
    champion: "Teemo",
    icon: "icon",
    losses: 2,
    encounters: 9,
    lossratio: 0.2,
  },
  {
    champion: "Shivana",
    icon: "icon",
    losses: 3,
    encounters: 8,
    lossratio: 0.3,
  },
  {
    champion: "Sylas",
    icon: "icon",
    losses: 1,
    encounters: 10,
    lossratio: 0.1,
  },
  {
    champion: "Teemo",
    icon: "icon",
    losses: 2,
    encounters: 9,
    lossratio: 0.2,
  },
  {
    champion: "Shivana",
    icon: "icon",
    losses: 3,
    encounters: 8,
    lossratio: 0.3,
  },
  {
    champion: "Sylas",
    icon: "icon",
    losses: 1,
    encounters: 10,
    lossratio: 0.1,
  },
  {
    champion: "Teemo",
    icon: "icon",
    losses: 2,
    encounters: 9,
    lossratio: 0.2,
  },
  {
    champion: "Shivana",
    icon: "icon",
    losses: 3,
    encounters: 8,
    lossratio: 0.3,
  },
  {
    champion: "Sylas",
    icon: "icon",
    losses: 1,
    encounters: 10,
    lossratio: 0.1,
  },
  {
    champion: "Teemo",
    icon: "icon",
    losses: 2,
    encounters: 9,
    lossratio: 0.2,
  },
  {
    champion: "Shivana",
    icon: "icon",
    losses: 3,
    encounters: 8,
    lossratio: 0.3,
  },
];

import TEMP_SylasPic from "@/assets/image/Temp/Sylas_bg.jpg";

const SummonerPageComponent = (summoner) => {
  return (
    <div className="bg-summoner-page-bg bg-contain h-full">
      <Header isSearchBar={true}></Header>
      <div className="h-full bg-[#182B40] bg-center md:mx-64 pb-16">
        <SummonerInfo
          summonerName={summoner.summoner.summonerName}
          summonerTag={summoner.summoner.summonerTag}
          summonerLevel={summoner.summoner.summonerLevel}
        ></SummonerInfo>
        <GameTypeBar></GameTypeBar>
        <LeagueNemesisDisplay
          src={TEMP_SylasPic}
          alt="League Nemesis Picture"
          topText="Overall"
          bottomRightText="Total Games Polled:"
          gameCount="342"
        />
        <LeagueNemesisStatisticsBar />
        <ChampionsTable columns={columns} data={championEntry}></ChampionsTable>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SummonerPageComponent;
