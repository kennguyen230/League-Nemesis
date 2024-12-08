import { useQuery } from "@tanstack/react-query";
import { pollSummonerState } from "./api";
import { SummonerData } from "./interfaces";

export const useSummonerPolling = (
  summonerNameAndTag: string,
  region: string,
  initialState: "processing" | "ready",
  setLocalSummoner: (data: SummonerData) => void
) => {
  // Setup a query that calls the polling route to check the status of the document.
  // This only needs to be done if the state of the document was 'processing' to begin with.
  // It will continue to poll every 5000ms and will only stop when the status of the document is 'ready'.
  const query = useQuery({
    queryKey: ["summonerState", summonerNameAndTag, region],
    queryFn: () => pollSummonerState(summonerNameAndTag, region),
    enabled: initialState === "processing", // Enable only if state is "processing"
    refetchInterval: (query) =>
      query.state.data?.state === "ready" ? false : 15000, // Stop polling if state is "ready"
  });

  // If the status was changed to 'ready', update the summoner data
  const { data, isSuccess } = query;
  console.log("Inside hook:", data);
  if (isSuccess && data?.state === "ready") {
    if (!data) {
      console.warn("Expected SummonerData, but received null.");
    } else {
      setLocalSummoner(data);
    }
  }

  return query; // Return the query object for use in the component
};
