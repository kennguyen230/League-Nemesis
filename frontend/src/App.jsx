import { useState } from "react";
import axios from "axios";

function App() {
  const [summonerName, setSummonerName] = useState("");
  const [matchList, setMatchList] = useState([]);
  const [puuid, setPuuid] = useState("");

  function getMatchlist() {
    axios
      .get(`http://localhost:5000/summoner/getMatchlist`, {
        params: { summoner: summonerName },
      })
      .then(function (response) {
        setMatchList(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function getPUUID() {
    axios
      .get(`http://localhost:5000/summoner/getPUUID`, {
        params: { summoner: summonerName },
      })
      .then(function (response) {
        setPuuid(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div>
      <h1>League Nemesis</h1>
      <input type="text" onChange={(e) => setSummonerName(e.target.value)} />
      <button onClick={() => getMatchlist()}>Get match list</button>
      <button onClick={() => getPUUID()}>Get PUUID</button>
      <ul>
        {matchList.map((match, index) => (
          <li key={index}>{match}</li>
        ))}
      </ul>
      <p>{puuid}</p>
    </div>
  );
}

export default App;
