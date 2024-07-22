export interface ChampionEnemyData {
    champName: string;
    encounters: number;
    losses: number;
    lossRate: number;
}

export interface ChampionUserData {
    champName: string;
    picks: number;
    wins: number;
    winRate: number;
}

export interface GameModeEnemyData {
    overall: ChampionEnemyData[];
    top: ChampionEnemyData[];
    jng: ChampionEnemyData[];
    mid: ChampionEnemyData[];
    bot: ChampionEnemyData[];
    sup: ChampionEnemyData[];
}

export interface GameModeUserData {
    overall: ChampionUserData[];
    top: ChampionUserData[];
    jng: ChampionUserData[];
    mid: ChampionUserData[];
    bot: ChampionUserData[];
    sup: ChampionUserData[];
}

export interface Enemy {
    normals: GameModeEnemyData;
    ranked: GameModeEnemyData;
    flex: GameModeEnemyData;
    aram: ChampionEnemyData[];
}

export interface User {
    normals: GameModeUserData;
    ranked: GameModeUserData;
    flex: GameModeUserData;
    aram: ChampionUserData[];
}