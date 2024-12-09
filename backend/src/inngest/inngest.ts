import { Inngest } from "inngest";
import { getClient } from "../services/ClientManager.js";
import { fetchUserData } from "../controllers/SummonerController.js";

export const inngest = new Inngest({
    id: "League Nemesis App",
});

const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

const fetchUserDataFunction = inngest.createFunction(
    { id: "fetch-data" },
    { event: "fetchdata" },
    async ({ event }) => {
        const { summoner_name, summoner_tag, region, puuid } = event.data;
        try {
            const client = await getClient(region);

            const result = await fetchUserData(
                summoner_name,
                summoner_tag,
                region,
                client,
                puuid
            );

            if (result) {
                console.log("Successfully fetched user data in Inngest function.");
            } else {
                console.error("Failed to fetch user data in Inngest function.");
            }
        } catch (error) {
            console.error("Error in Inngest function:", error.message);
        }
    }
);

export const functions = [
    helloWorld, fetchUserDataFunction
];
