import { createFileRoute } from "@tanstack/react-router";
import { fetchSummonerData } from "@/api/api";

import SummonerPageComponent from "@/pages/SummonerPageComponent";

export const Route = createFileRoute("/summoner/$id")({
  loader: async ({ params: { id } }) => fetchSummonerData(id),
  component: SummonerPage,
});

function SummonerPage() {
  const summoner = Route.useLoaderData();
  return <SummonerPageComponent summoner={summoner} />;
}
