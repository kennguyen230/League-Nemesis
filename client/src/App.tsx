import Header from "./layouts/Header";
import SmallSearchBar from "./layouts/SmallSearchBar";
import SummonerInfo from "./layouts/SummonerPage/SummonerInfo";
import GameTypeBar from "./layouts/SummonerPage/GameTypeBar";
import LeagueNemesisDisplay from "./layouts/SummonerPage/LeagueNemesisDisplay";
import LeagueNemesisStatisticsBar from "./layouts/SummonerPage/LeagueNemesisStatisticsBar";

import TEMP_SylasPic from "./assets/image/Temp/Sylas_bg.jpg";

const App = () => {
  return (
    <div className="bg-[#182B40] h-screen">
      <Header SearchBar={SmallSearchBar}></Header>
      <SummonerInfo></SummonerInfo>
      <GameTypeBar></GameTypeBar>
      <LeagueNemesisDisplay
        src={TEMP_SylasPic}
        alt="League Nemesis Picture"
        topText="Overall"
        bottomRightText="Total Games Polled:"
        gameCount="342"
      />
      <LeagueNemesisStatisticsBar />
    </div>
  );
};

export default App;
