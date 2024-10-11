import axios from "axios";

export const fetchSummonerData = async (region: string, summonerId: string) => {
  try {
    const response = await axios.get(
      `http://192.168.1.247:5000/summoner/querySummoner`,
      {
        params: { region, summoner: summonerId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetchin data from query summoner: ", error);
  }
};
