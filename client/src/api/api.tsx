import axios from "axios";

export const fetchSummonerData = async (region: string, summonerId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/summoner/getBasicInfo`,
      {
        params: { region, summoner: summonerId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetchin data form getBasicInfo: ", error);
  }
};
