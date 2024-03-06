/*
    @brief Purpose of this file is to create a map that holds a singleton of our client for every region.
    This way the client doesn't need to be initialize in every call from SummonerController if it has already
    been created. We solved the problem of having users from different regions by creating a variable for regions.
    By default, the region will be NA if a region is not provided.
*/

import config from './src/config.js'
import { Client } from 'shieldbow';

// Object to hold initialized client instances by region
const clientsByRegion = {};

async function initializeClient(region) {
    // Check if a client for the specified region already exists
    if (!clientsByRegion[region]) {
        // If not, create a new client instance for the region
        const client = new Client(config.API_KEY);
        await client.initialize({
            region: region,
            cache: true,
            storage: true,
            fetch: {
                champions: true,
                items: false,
                runes: false,
                summonerSpells: false
            }
        });
        // Store the initialized client in the clientsByRegion object
        clientsByRegion[region] = client;
    }
    // Return the client instance for the requested region
    return clientsByRegion[region];
}

// Export our region specific singleton with a default region of NA
export async function getClient(region = 'na') {
    return await initializeClient(region);
}
