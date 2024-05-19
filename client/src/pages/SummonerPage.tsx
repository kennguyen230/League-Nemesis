import Header from "./layouts/Header";
import SmallSearchBar from "./layouts/SmallSearchBar";
import SummonerInfo from "./layouts/SummonerPage/SummonerInfo";
import GameTypeBar from "./layouts/SummonerPage/GameTypeBar";
import LeagueNemesisDisplay from "./layouts/SummonerPage/LeagueNemesisDisplay";

import TEMP_SylasPic from "./assets/image/Temp/Sylas_bg.jpg";

const App = () => {
  return (
    <div className="bg-[#182B40] h-screen">
      <Header SearchBar={SmallSearchBar}></Header>
      <SummonerInfo></SummonerInfo>
      <GameTypeBar></GameTypeBar>
      {/* <div className="w-full flex flex-col items-center justify-center mt-4"> */}
      {/* </div> */}
      {/* <img src={TEMP_SylasPic} alt="ChampPic" className="rounded-[2rem] p-4" /> */}
      <LeagueNemesisDisplay
        src={TEMP_SylasPic}
        alt="League Nemesis Picture"
        topText="Overall"
        bottomRightText="Total Games Polled:"
        gameCount="342"
      />
    </div>
  );
};

export default App;
