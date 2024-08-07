import { useState } from "react";
import axios from "axios";

function App() {
  const [summonerName, setSummonerName] = useState("");
  const [summonerTag, setSummonerTag] = useState("");
  const [lossRateMap, setLossRateMap] = useState([]);

  function queryLNData() {
    axios
      .get(`http://192.168.1.247:5000/summoner/querySummonerEnemyData`, {
        params: { summoner: summonerName, tag: summonerTag },
      })
      .then((response) => {
        console.log(response.data);
        setLossRateMap(response.data.normalOverallEnemyData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderTable() {
    const rows = [];

    lossRateMap.forEach((champion) => {
      rows.push(
        <tr key={champion.champName}>
          <td>{champion.champName}</td>
          <td>{champion.losses}</td>
          <td>{champion.encounters}</td>
          <td>{champion.lossRate.toFixed(2)}%</td>
        </tr>
      );
    });

    return rows;
  }

  return (
    <div>
      <h1>League Nemesis</h1>
      <input type="text" onChange={(e) => setSummonerName(e.target.value)} />
      <input type="text" onChange={(e) => setSummonerTag(e.target.value)} />
      <button onClick={() => queryLNData()}>Get LN Data</button>

      {lossRateMap.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Champion</th>
                <th>Losses</th>
                <th>Encounters</th>
                <th>Loss Rate</th>
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
