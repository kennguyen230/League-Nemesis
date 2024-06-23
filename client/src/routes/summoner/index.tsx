/**
 * @brief This page is a default screen for if a user decides to go to
 * LeagueNemesis.lol/summoner/
 *
 * Note: This page is NOT to be used as an error screen. An error component
 * should be rendered in $id.tsx if the user searches for a summoner that
 * does not exist or they edit the URL to a not existing summoner.
 */

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/summoner/")({
  component: () => <>Hello welcome to the default summoner page you SUCK</>,
});
