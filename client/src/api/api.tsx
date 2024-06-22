import axios from "axios";

export const fetchSummonerData = async (summonerId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/summoner/getBasicInfo`,
      {
        params: { summoner: summonerId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetchin data form getBasicInfo: ", error);
  }
};
