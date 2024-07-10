/**
 * @brief This page is a default screen for if a user decides to go to
 * LeagueNemesis.lol/summoner/
 *
 * TODO: Create a common page that lets the user know they are on an invalid page
 */

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/summoner/")({
  component: () => <>Hello welcome to the default summoner page</>,
});
