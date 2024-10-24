/**
 * @brief This is a catch-all file that exports methods for processing data. 
 */
import { UserEnemyData, Enemy, User, GameModeEnemyData, GameModeUserData, ChampionEnemyData, ChampionUserData } from './Interfaces.js';

function emptyChampionEnemyData(): ChampionEnemyData {
    return {
        champName: "",
        champId: "",
        losses: 0,
        encounters: 0,
        lossRate: 0
    }
}

function emptyChampionUserData(): ChampionUserData {
    return {
        champName: "",
        champId: "",
        wins: 0,
        picks: 0,
        winRate: 0
    }
}

function emptyGameModeEnemyData(): GameModeEnemyData {
    return {
        overall: [],
        top: [],
        jng: [],
        mid: [],
        bot: [],
        sup: []
    }
};

function emptyGameModeUserData(): GameModeUserData {
    return {
        overall: [],
        top: [],
        jng: [],
        mid: [],
        bot: [],
        sup: []
    }
};

/**
 * Takes in a user's match list and produce an 'enemy' and 'user' object
 * which holds data on an enemy/user based on gametype + lane
 * 
 * @param {Array} matchList
 * @param {String} summonerName
 * @param {Object} numberOfGames
 * @returns returnObject holds enemy and user data
 */
async function createReturnObjects(
    matchList: Array<any>,
    summonerName: string,
    numberOfGames: { totalGames: number, normals: number, aram: number, flex: number, ranked: number, totalLosses: number },
    client
) {
    const enemy: Enemy = {
        normals: emptyGameModeEnemyData(),
        ranked: emptyGameModeEnemyData(),
        flex: emptyGameModeEnemyData(),
        all: emptyGameModeEnemyData(),
        aram: []
    };

    const user: User = {
        normals: emptyGameModeUserData(),
        ranked: emptyGameModeUserData(),
        flex: emptyGameModeUserData(),
        all: emptyGameModeUserData(),
        aram: []
    };

    await processMatchList(summonerName, matchList, enemy, user, numberOfGames, client);

    console.log("(DataProcessing.ts) createReturnObjects(): User");
    console.dir(user, { depth: null });
    console.log("(DataProcessing.ts) createReturnObjects(): Enemy");
    console.dir(enemy, { depth: null });

    return { enemy, user };
}

/**
 * Takes the champion passed in and populates enemy object based on which game mode it is.
 * 
 * @param enemy Object that holds all user data
 * @param champName Name of champion
 * @param champId Id of champion (ex. Khazix instead of Kha'zix)
 * @param userTeamWon Flag to indicate if user won the current match
 * @param gameMode Normals vs ranked vs aram vs flex
 * @param lane Which lane to process for
 */
const updateEnemyData = (
    enemy: Enemy,
    champName: string,
    champId: string,
    userTeamWon: boolean,
    gameMode: keyof Enemy,
    lane: keyof GameModeEnemyData
) => {
    // Nested function that update enemy data for each entry
    const updateChampionData = (champArray: ChampionEnemyData[], champId: string, userTeamWon: boolean) => {
        // Check to see if this entry already exists
        let champData = champArray.find(champ => champ.champId === champId);

        // If not, create a default entry with the champ name
        if (!champData) {
            champData = emptyChampionEnemyData();
            champData.champId = champId;
            champData.champName = champName;
            champArray.push(champData);
        }

        // Then update each property
        champData.encounters += 1;
        if (!userTeamWon) {
            champData.losses += 1;
        }
        champData.lossRate = (champData.losses / champData.encounters) * 100;
    };

    if (gameMode == 'aram') {
        // Update aram champion data for the aram array
        // as well as the all array.overall
        updateChampionData(enemy.aram, champId, userTeamWon);
        updateChampionData(enemy["all"].overall, champId, userTeamWon);

    } else {
        // For each match of type gameMode, update the lane
        // specific array but also the overall array
        updateChampionData(enemy[gameMode][lane], champId, userTeamWon);
        updateChampionData(enemy[gameMode].overall, champId, userTeamWon);

        // Then, update the all array for each lane then the
        // all array.overall
        updateChampionData(enemy["all"][lane], champId, userTeamWon);
        updateChampionData(enemy["all"].overall, champId, userTeamWon);
    }
};

/**
 * Takes the champion passed in and populates user object based on which game mode it is.
 * 
 * @param user Object that holds all user data
 * @param champName Name of champion
 * @param champId Id of champion (ex. Khazix instead of Kha'zix)
 * @param userTeamWon Flag to indicate if user won the current match
 * @param gameMode Normals vs ranked vs aram vs flex
 * @param lane Which lane to process for
 */
const updateUserData = (
    user: User,
    champName: string,
    champId: string,
    userTeamWon: boolean,
    gameMode: keyof User,
    lane: keyof GameModeUserData
) => {
    const updateChampionData = (champArray: ChampionUserData[], champId: string, userTeamWon: boolean) => {
        // Check to see if this entry already exists
        let champData = champArray.find(champ => champ.champName.toLowerCase() === champName.toLowerCase());

        // If not, create a default entry with the champ name
        if (!champData) {
            champData = emptyChampionUserData();
            champData.champId = champId;
            champData.champName = champName;
            champArray.push(champData);
        }

        // Then update each property
        champData.picks += 1;
        if (userTeamWon) {
            champData.wins += 1;
        }
        champData.winRate = (champData.wins / champData.picks) * 100;
    };

    if (gameMode == 'aram') {
        updateChampionData(user.aram, champId, userTeamWon);
        updateChampionData(user["all"].overall, champId, userTeamWon);
    } else {
        updateChampionData(user[gameMode][lane], champId, userTeamWon);
        updateChampionData(user[gameMode].overall, champId, userTeamWon);

        updateChampionData(user["all"][lane], champId, userTeamWon);
        updateChampionData(user["all"].overall, champId, userTeamWon);
    }
};

/**
 * Fetch match data for every game in the match list simultaneously then gathers data
 * on which side won, which side the user is on, and what game mode it is. Uses this data
 * to populate enemy/user object.
 * 
 * @param summonerName Summoner name from client
 * @param matchList Holds recently fetched match list
 * @param enemy Object that holds enemy data
 * @param user Object that holds user data
 * @param numberOfGames Keeps track of number of losses total, between DB and ML
 * @param client The Shieldbowjs client
 */
async function processMatchList(
    summonerName: string,
    matchList: Array<any>,
    enemy: Enemy,
    user: User,
    numberOfGames: { totalGames: number, normals: number, aram: number, flex: number, ranked: number, totalLosses: number },
    client
) {
    try {
        // Fetch match data all at the same time
        const matchDetails = await Promise.all(
            matchList.map((matchId) =>
                client.matches.fetch(matchId).catch((error: any) => {
                    console.error(`(DataProcessing.ts) Failed to fetch match ${matchId}:`, error);
                    return null; // Return null if there's an error fetching a match
                })
            )
        );

        matchDetails.forEach((match) => {
            if (!match) return; // Skip if match details couldn't be fetched

            // Grab game queue type (follow reference on Riot Dev Docs)
            // https://static.developer.riotgames.com/docs/lol/queues.json
            const gameQueue: number = match.queue.queueId;

            // Then determine game mode based off the queue ID
            let gameMode: keyof Enemy | keyof User | undefined;
            switch (gameQueue) {
                case 400:
                case 430:
                case 490:
                    gameMode = "normals";
                    numberOfGames.normals += 1;
                    break;
                case 420:
                    gameMode = "ranked";
                    numberOfGames.ranked += 1;
                    break;
                case 440:
                    gameMode = "flex";
                    numberOfGames.flex += 1;
                    break;
                case 450:
                    gameMode = "aram";
                    numberOfGames.aram += 1;
                    break;
                default:
                    gameMode = undefined;
            }

            // If the game mode is not one of the ones listed, return early
            // as it may cause an error in the following match detail calls
            if (gameMode === undefined) return;

            const isRemake: boolean = match.teams.get("blue").participants[0].remake;
            if (isRemake) return; // Skip if it's a remake

            // Check which side the user is on
            const userTeam: string = match.teams.get("blue").participants.some(
                (participant) => participant.summoner.name === summonerName) ? "blue" : "red";

            // The opposing team is naturally the other side
            const opposingTeam: string = userTeam === "blue" ? "red" : "blue";

            // Check to see if user won this game and if not
            // update the loss counter
            const userTeamWon: boolean = match.teams.get(userTeam).win;
            if (!userTeamWon) numberOfGames.totalLosses += 1;

            // If the game mode is not one of the ones listed, return early as
            // League Nemesis only deals with normals, ranked, flex, and aram
            if (gameMode === undefined) return;

            // Populate user object
            match.teams.get(userTeam).participants.forEach((participant) => {
                // Loop through list of participants until the user is found
                if (participant.summoner.name.trim().toLowerCase() !== summonerName.trim().toLowerCase()) return;

                // If it is the user, grab their champion and update the user object
                const champName: string = participant.champion.champ.name;
                const champId: string = participant.champion.champ.id;

                // Return early if ARAM, don't need to populate lane data
                if (gameMode == "aram") {
                    updateUserData(user, champName, champId, userTeamWon, gameMode, "overall");
                    return;
                }

                // For non-aram game mode, need to also update each individual lane
                switch (participant.position.team) {
                    case "TOP":
                        updateUserData(user, champName, champId, userTeamWon, gameMode, "top");
                        break;
                    case "JUNGLE":
                        updateUserData(user, champName, champId, userTeamWon, gameMode, "jng");
                        break;
                    case "MIDDLE":
                        updateUserData(user, champName, champId, userTeamWon, gameMode, "mid");
                        break;
                    case "BOTTOM":
                        updateUserData(user, champName, champId, userTeamWon, gameMode, "bot");
                        break;
                    case "UTILITY":
                        updateUserData(user, champName, champId, userTeamWon, gameMode, "sup");
                        break;
                }
            })

            // Populate enemy data
            match.teams.get(opposingTeam).participants.forEach((participant) => {
                // Grab champ id of each opponent and update the enemy object
                const champName: string = participant.champion.champ.name;
                const champId: string = participant.champion.champ.id;

                // Return early if ARAM, don't need to populate lane data
                if (gameMode == "aram") {
                    updateEnemyData(enemy, champName, champId, userTeamWon, gameMode, "overall");
                    return;
                }

                // For non-aram game mode, need to also update each individual lane
                switch (participant.position.team) {
                    case "TOP":
                        updateEnemyData(enemy, champName, champId, userTeamWon, gameMode, "top");
                        break;
                    case "JUNGLE":
                        updateEnemyData(enemy, champName, champId, userTeamWon, gameMode, "jng");
                        break;
                    case "MIDDLE":
                        updateEnemyData(enemy, champName, champId, userTeamWon, gameMode, "mid");
                        break;
                    case "BOTTOM":
                        updateEnemyData(enemy, champName, champId, userTeamWon, gameMode, "bot");
                        break;
                    case "UTILITY":
                        updateEnemyData(enemy, champName, champId, userTeamWon, gameMode, "sup");
                        break;
                }
            });
        });
    } catch (error) {
        console.error("(DataProcessing.ts) Error in processMatchList", error);
    }
}

/**
 * This function takes in either a 'user' or 'enemy' db/ml object and differentiates
 * between ARAM and other game modes. If it's ARAM it goes straight to merging champions.
 * Otherwise, it loops through each game mode. 
 * 
 * @param db Database returnObject. Passed in either user data or enemy data
 * @param ml Match list returnObject. Passed in either user data or enemy data
 * @param isUser Flag to indicate if user or enemy data was passed in
 */
function mergeUserEnemyData(db: User | Enemy, ml: User | Enemy, isUser: boolean = false) {
    // For each gamemode (normal, ranked, flex, aram)
    for (let gameMode in ml) {
        // If it's ARAM, jump straight to merging stats as ARAM doesn't have
        // different lanes
        if (gameMode == "aram") {
            // Throw in check to make sure DB has an ARAM array
            if (!db[gameMode]) {
                db[gameMode] = [];
            }

            mergeLanes(db[gameMode], ml[gameMode], isUser);
        }
        // Otherwise, if it's not ARAM then break it down by lane
        else {
            // Throw in check to make sure DB has this gameMode array
            if (!db[gameMode]) {
                db[gameMode] = {
                    overall: [],
                    top: [],
                    jng: [],
                    mid: [],
                    bot: [],
                    sup: []
                };
            }

            mergeGameModeData(db[gameMode], ml[gameMode], isUser);
        }
    }
}

/**
 * This function takes in a db/ml object passed down by game mode. For each game mode,
 * pass it down further to process the lane arrays.
 * 
 * @param db_gameMode db object->gameMode (ie. normals, ranked, etc)
 * @param ml_gameMode ml object->gameMode 
 * @param isUser Flag to indicate if user or enemy data was passed in
 */
function mergeGameModeData(db_gameMode: GameModeUserData | GameModeEnemyData, ml_gameMode: GameModeUserData | GameModeEnemyData, isUser: boolean = false) {
    for (let lane in ml_gameMode) {
        if (!db_gameMode[lane]) {
            db_gameMode[lane] = [];
        }

        mergeLanes(db_gameMode[lane], ml_gameMode[lane], isUser);
    }
}

/**
 * This function takes in a db/ml object passed down by lane. For each champion in the lane,
 * merge the stats.
 * 
 * @param db_gameMode_lane db object->gameMode->lane[] (ie. overall, top, etc)
 * @param ml_gameMode_lane ml object->gameMode->lane[]
 * @param isUser Flag to indicate if user or enemy data was passed in
 */
function mergeLanes(db_gameMode_lane: (ChampionUserData | ChampionEnemyData)[], ml_gameMode_lane: (ChampionUserData | ChampionEnemyData)[], isUser: boolean = false) {
    // For each champion in the match list object
    ml_gameMode_lane.forEach((ml_champ) => {
        // Check to see if the champion exists in the database
        let db_champ = db_gameMode_lane.find(c => c.champId === ml_champ.champId);

        // If it does, merge the stats
        if (db_champ) {
            mergeStats(db_champ, ml_champ, isUser);
        }
        // Otherwise, push the champion to the database
        else {
            db_gameMode_lane.push({ ...ml_champ });
        }
    })
}

/**
 * This function takes in a champion of enemy or user type and merges the data.
 * 
 * @param db_champ db object->gameMode->lane[].champion (ie. overall, top, etc)
 * @param ml_champ ml object->gameMode->lane[].champion 
 * @param isUser Flag to indicate if user or enemy data was passed in
 */
function mergeStats(db_champ: ChampionUserData | ChampionEnemyData, ml_champ: ChampionUserData | ChampionEnemyData, isUser: boolean = false) {
    // If this is user data, use the appropriate properties
    if (isUser) {
        (db_champ as ChampionUserData).wins += (ml_champ as ChampionUserData).wins;
        (db_champ as ChampionUserData).picks += (ml_champ as ChampionUserData).picks;
        (db_champ as ChampionUserData).winRate = (db_champ as ChampionUserData).wins / (db_champ as ChampionUserData).picks;
    }
    // Otherwise, use enemy properties
    else {
        (db_champ as ChampionEnemyData).losses += (ml_champ as ChampionEnemyData).losses;
        (db_champ as ChampionEnemyData).encounters += (ml_champ as ChampionEnemyData).encounters;
        (db_champ as ChampionEnemyData).lossRate = (db_champ as ChampionEnemyData).losses / (db_champ as ChampionEnemyData).encounters;
    }
}

/**
 * For every gamemode for a returnObject, sort the lane arrays.
 * For user data, sort by pick rate.
 * For enemy data, use a weighted sorting algorithm to sort primarily
 * by loss rate but also by total losses.
 * 
 * @param returnObject The object holding enemy and user data
 */
function sortUserEnemyData(returnObjectUser: User, returnObjectEnemy: Enemy) {
    console.log("(DataProcessing.ts) Inside sortUserEnemyData()")

    // Loop through each gamemode in the enemy/user objects
    for (let gameMode in returnObjectEnemy) {
        // If it's aram, jump straight to sorting because aram
        // has no lanes and is itself an array that can be sorted
        if (gameMode === "aram") {
            sortEnemyStats(returnObjectEnemy[gameMode]);
            sortUserStats(returnObjectUser[gameMode]);
        } else {
            // Otherwise, loop through the lanes and sort the underlying arrays
            for (let lane in returnObjectEnemy[gameMode]) {
                sortEnemyStats(returnObjectEnemy[gameMode][lane]);
                sortUserStats(returnObjectUser[gameMode][lane]);
            }
        }
    }
}

// The core algorithm to determine a user's League Nemesis
function sortEnemyStats(laneArr: ChampionEnemyData[]) {
    laneArr.sort((champ1, champ2) => {
        const weightedChamp1 = champ1.lossRate * Math.log(champ1.encounters + 1);
        const weightedChamp2 = champ2.lossRate * Math.log(champ2.encounters + 1);

        if (weightedChamp2 !== weightedChamp1) {
            return weightedChamp2 - weightedChamp1;
        }
        return champ2.losses - champ1.losses;
    });
}

// Sorts user data soley on pick rate
function sortUserStats(userArr: ChampionUserData[]) {
    userArr.sort((champ1, champ2) => {
        return champ2.picks - champ1.picks;
    });
}

export { createReturnObjects, mergeUserEnemyData, sortUserEnemyData };
