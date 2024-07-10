import { useState } from "react";
import axios from "axios";

function App() {
  const [summonerName, setSummonerName] = useState("");
  const [summonerTag, setSummonerTag] = useState("");
  const [puuid, setPuuid] = useState("");
  const [lossRateMap, setLossRateMap] = useState({});

  function getPUUID() {
    axios
      .get(`http://localhost:5000/summoner/getPUUID`, {
        params: { summoner: summonerName, tag: summonerTag },
      })
      .then(function (response) {
        setPuuid(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function queryMaps() {
    axios
      .get(`http://localhost:5000/summoner/queryMaps`, {
        params: { summoner: summonerName, tag: summonerTag },
      })
      .then(function (response) {
        console.log(response.data);
        setLossRateMap(response.data);
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
      <input type="text" onChange={(e) => setSummonerTag(e.target.value)} />
      <button onClick={() => getPUUID()}>Get PUUID</button>
      <button onClick={() => queryMaps()}>Query maps</button>

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
