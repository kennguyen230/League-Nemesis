/**
 * @brief The purpose of this file is to create a Client singleton that can only be instantiated once per region.
 * There is a region map that keeps track of a Client object has been instantiated for that region. By default,
 * a Client will be instantiated to the 'NA' region. 
 */

import { getTokenSourceMapRange } from 'typescript';
import config from '../config.js'
import { Client } from 'shieldbow';

// Object to hold initialized client instances by region
const clientsByRegion = {};

async function initializeClient(region) {
    // Check if a client for the specified region already exists
    if (!clientsByRegion[region]) {
        // If not, create a new client instance for the region
        const client = new Client(config.apiKey);
        console.log("Client initialized with region: " + region);

        await client.initialize({
            region: region,
            locale: 'en_US',
            cache: false,
            storage: {
                enable: {
                    api: false,
                    dragon: {
                        champions: false,
                        items: false,
                        runes: false,
                        summonerSpells: false,
                    }
                }
            },
            fetch: {
                champions: false,
                items: false,
                runes: false,
                summonerSpells: false
            },
            version: "14.22",
        });
        // Store the initialized client in the clientsByRegion object
        clientsByRegion[region] = client;

        await client.updatePatch('14.22', false);
    }
    // Return the client instance for the requested region
    return clientsByRegion[region];
}

// Export our region specific singleton with a default region of NA
export async function getClient(region = 'na') {
    return await initializeClient(region);
}
