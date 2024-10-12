import { createFileRoute } from "@tanstack/react-router";
import { fetchSummonerData } from "@/data/api";
import { queryOptions } from "@tanstack/react-query";

import SummonerPageComponent from "@/pages/SummonerPageComponent";
import ErrorSearchPageComponent from "@/pages/ErrorSearchPageComponent";

const getSummonerDetails = (region: string, summonerId: string) =>
  queryOptions({
    queryKey: ["GET_SUMMONER", region, summonerId],
    queryFn: () => fetchSummonerData(region, summonerId),
    staleTime: 5 * 60 * 1000,
  });

export const Route = createFileRoute("/summoner/$region/$id")({
  loader: async ({ params: { region, id }, context: { queryClient } }) =>
    queryClient.ensureQueryData(getSummonerDetails(region, id)),
  component: SummonerPage,
  errorComponent: ErrorSearchPageComponent,
});

function SummonerPage() {
  const summoner = Route.useLoaderData();
  console.log(summoner);
  return <SummonerPageComponent summoner={summoner} />;
}
