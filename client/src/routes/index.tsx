import { createFileRoute } from "@tanstack/react-router";
import HomePageComponent from "@/pages/HomePageComponent";

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <HomePageComponent></HomePageComponent>
    </>
  ),
});
