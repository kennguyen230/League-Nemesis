export interface ChampionEnemyData {
    champName: string;
    losses: number;
    encounters: number;
    lossRate: number;
}

export interface ChampionUserData {
    champName: string;
    wins: number;
    picks: number;
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
    all: GameModeEnemyData;
    aram: ChampionEnemyData[];
}

export interface User {
    normals: GameModeUserData;
    ranked: GameModeUserData;
    flex: GameModeUserData;
    all: GameModeUserData;
    aram: ChampionUserData[];
}

export interface UserEnemyData {
    userData: User,
    enemyData: Enemy
}