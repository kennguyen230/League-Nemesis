/*
    @brief Purpose of this file is to grab summonerName from frontend then pass that forward
    to grab user data from DB and Riot API. File should ultimately gather necessary maps to return
    to the frontend for display

    NOTE: Consider the pros and cons of maintaining the raw maps instead of the lossRateMap
    & totalLossesMap

    If it is a returning user: 
        1. Grab matches & lastGameTimestamp from DB
        2. Use lastGameTimestamp as a parameter and query for latest games from Riot/Shieldbow
        3. Populate a map with the latest games 
        4. Merge latestGames map with preexisting maps
        5. Return maps to frontend

    If it is a new user:
        1. Query for as many games as possible from Riot/Shieldbow
        2. Create lossRateMap and totalLossesMap
        3. Possibly continue querying for more games in the background & populate
            the database with the new games. 
*/
import RiotClient from "../services/RiotGamesService"

function getDataFromDB() {
    // Get puuid from Shieldbow
    // Get lastGameTimeStamp and pass it to Shieldbow to grab recent games
    // Send Shieldbow match history data to DataProcessor to turn into maps
    // Send recent game maps to DataProcessor as well as DB map to merge
    // Update DB with new map + new lastGameTimestamp
    // Send to frontend
}

function getDataFromShieldBow(summonerName) {
    // Get last 100 games from shieldbow

    // Put through DataProcessor to get back maps
    // Send to frontend
}

function mergeData() {
    // After getting data from Shieldbow & DB, merge the data together
}

function sendToUser() {
    // Send back to frontend
}

function updateDB() {
    // Update the data in the database with new maps + last endgame timestamp
}

// Our 'portal' to the frontend. Request for data come through here and we send the maps
// back through this same 'portal'
app.get('/getMaps', (req, res) => {
    const summonerName = req.query.summonerName;

})
