/**
 * @brief This page is a default screen for if a user decides to go to
 * LeagueNemesis.lol/summoner/
 *
 */

import { createFileRoute } from "@tanstack/react-router";
import ErrorRootPageComponent from "@/pages/ErrorRootPageComponent";

export const Route = createFileRoute("/summoner/")({
  component: ErrorRootPageComponent,
});
