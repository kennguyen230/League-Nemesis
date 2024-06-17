import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/summoner/$id")({
  component: Summoner,
});

function Summoner() {
  const { id } = Route.useParams();
  return <div>Hello {id}</div>;
}
