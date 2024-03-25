import { useState } from "react";
import axios from "axios";

function App() {
  const [summonerName, setSummonerName] = useState("");
  const [matchList, setMatchList] = useState([]);
  const [puuid, setPuuid] = useState("");
  const [lossRateMap, setLossRateMap] = useState({});

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

  function getLN() {
    axios
      .get(`http://localhost:5000/summoner/getMaps`, {
        params: { summoner: summonerName },
      })
      .then(function (response) {
        console.log(response.data); // This should now be an object, not a Map
        setLossRateMap(response.data); // Directly use the object
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function renderTable() {
    const rows = [];
    for (const [champion, stats] of Object.entries(lossRateMap)) {
      rows.push(
        <tr key={champion}>
          <td>{champion}</td>
          <td>{stats.losses}</td>
          <td>{stats.encounters}</td>
          <td>{(stats.lossRatio * 100).toFixed(2)}%</td>
        </tr>
      );
    }
    return rows;
  }

  return (
    <div>
      <h1>League Nemesis</h1>
      <input type="text" onChange={(e) => setSummonerName(e.target.value)} />
      <button onClick={() => getMatchlist()}>Get match list</button>
      <button onClick={() => getPUUID()}>Get PUUID</button>
      <button onClick={() => getLN()}>League Nemesis</button>
      <ul>
        {matchList.map((match, index) => (
          <li key={index}>{match}</li>
        ))}
      </ul>
      <p>{puuid}</p>
      {Object.keys(lossRateMap).length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Champion</th>
                <th>Losses</th>
                <th>Total Games</th>
                <th>Loss Percentage</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
