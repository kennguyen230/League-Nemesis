import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import SummonerInfo from "@/layouts/SummonerPage/SummonerInfo";
import GameTypeBar from "@/layouts/SummonerPage/GameTypeBar";
import LeagueNemesisDisplay from "@/layouts/SummonerPage/LeagueNemesisDisplay";
import LeagueNemesisStatisticsBar from "@/layouts/SummonerPage/LeagueNemesisStatisticsBar";

import { columns } from "@/layouts/SummonerPage/ChampionsColumn";
import { ChampionsTable } from "@/layouts/SummonerPage/ChampionsTable";

const SummonerPageComponent = (summoner) => {
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
          champion={summoner.summoner.maps[0].champion}
          topText="Overall"
          gameCount={summoner.summoner.games}
        />

        {/* Statistics correlating to the LN */}
        <LeagueNemesisStatisticsBar champion={summoner.summoner.maps[0]} />

        {/* Detailed table view of champions based off role */}
        <ChampionsTable columns={columns} data={summoner.summoner.maps} />
      </div>
      <Footer />
    </div>
  );
};

export default SummonerPageComponent;
