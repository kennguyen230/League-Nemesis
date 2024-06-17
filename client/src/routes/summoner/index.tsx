import { createFileRoute } from "@tanstack/react-router";
import SummonerPage from "@/pages/SummonerPage";

export const Route = createFileRoute("/summoner/")({
  component: () => (
    <>
      <SummonerPage></SummonerPage>
    </>
  ),
});
