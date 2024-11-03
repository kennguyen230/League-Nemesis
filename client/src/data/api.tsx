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
    console.error("Error fetching data from query summoner: ", error);
  }
};

export const checkNewUser = async (region: string, summonerId: string) => {
  try {
    const response = await axios.head(
      `http://192.168.1.247:5000/summoner/checkNewUser`,
      {
        params: { region, summoner: summonerId },
      }
    );

    if (response.status == 200) {
      return false; // Status 200 indicates user exists in db
    } else if (response.status == 201) {
      return true; // Status 201 indicates user does not exist
    }
  } catch (error) {
    console.error("Error checking for new user: ", error);
  }
};
