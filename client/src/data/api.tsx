import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const fetchSummonerData = async (
  summonerNameAndTag: string,
  region: string
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/summoner/querySummoner`, {
      params: { summonerNameAndTag, region },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data from query summoner: ", error);
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

export const pollSummonerState = async (summonerNameAndTag, region) => {
  const response = await axios.get(
    `${API_BASE_URL}/summoner/pollSummonerStatus`,
    { params: { summonerNameAndTag, region } }
  );

  return response.data;
};
