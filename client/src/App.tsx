import Header from "./layouts/Header";
import SmallSearchBar from "./layouts/SmallSearchBar";
import SummonerInfo from "./layouts/SummonerPage/SummonerInfo";

const App = () => {
  return (
    <div>
      <Header SearchBar={SmallSearchBar}></Header>
      <SummonerInfo></SummonerInfo>
    </div>
  );
};

export default App;
