import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchSummonerData = async (region: string, summonerId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/summoner/querySummoner`, {
      params: { region, summoner: summonerId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from query summoner: ", error);
  }
};

export const checkNewUser = async (region: string, summonerId: string) => {
  try {
    const response = await axios.head(`${API_BASE_URL}/summoner/checkNewUser`, {
      params: { region, summoner: summonerId },
    });

    if (response.status == 200) {
      return false; // Status 200 indicates user exists in db
    } else if (response.status == 201) {
      return true; // Status 201 indicates user does not exist
    }
  } catch (error) {
    console.error("Error checking for new user: ", error);
  }
};

export const autoSuggestUsers = async (
  summonerName: string,
  region: string
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/summoner/autoSuggestUsers`,
      { params: { summonerName, region } }
    );

    return response.data;
  } catch (error) {
    console.error("Error in auto suggest: ", error);
  }
};
