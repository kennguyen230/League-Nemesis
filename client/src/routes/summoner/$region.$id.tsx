import { createFileRoute } from "@tanstack/react-router";
import { fetchSummonerData } from "@/api/api";

import SummonerPageComponent from "@/pages/SummonerPageComponent";

export const Route = createFileRoute("/summoner/$region/$id")({
  loader: async ({ params: { region, id } }) => fetchSummonerData(region, id),
  component: SummonerPage,
});

function SummonerPage() {
  const summoner = Route.useLoaderData();
  console.log(summoner.level);
  return <SummonerPageComponent summoner={summoner} />;
}
