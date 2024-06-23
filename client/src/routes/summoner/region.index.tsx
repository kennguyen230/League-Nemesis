/**
 * @brief This page is a default screen for if a user decides to go to
 * LeagueNemesis.lol/summoner/region/
 *
 * TODO: Create a common page that lets the user know they are on an invalid page
 */

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/summoner/region/")({
  component: () => <div>Hello /summoner/region/!</div>,
});
