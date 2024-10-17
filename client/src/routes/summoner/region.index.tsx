/**
 * @brief This page is a default screen for if a user decides to go to
 * LeagueNemesis.lol/summoner/region/
 *
 */

import { createFileRoute } from "@tanstack/react-router";
import ErrorRootPageComponent from "@/pages/ErrorRootPageComponent";

export const Route = createFileRoute("/summoner/region/")({
  component: ErrorRootPageComponent,
});
