import axios from "axios";

export const fetchSummonerData = async (region: string, summonerId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/summoner/querySummoner`,
      {
        params: { region, summoner: summonerId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data from query summoner: ", error);
  }
};

export const checkNewUser = async (region: string, summonerId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/summoner/checkNewUser`,
      {
        params: { region, summoner: summonerId },
      }
    );

    if (response.status == 200) {
      return false; // Status 200 indicates user exists in db
    } else {
      return true; // Otherwise a status 404 which indicates new user
    }
  } catch (error) {
    console.error("Error checking for new user: ", error);
  }
}
