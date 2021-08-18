import { SeasonalAnimeRelease } from "./types";

export type {
    SeasonalAnimeList
}

interface SeasonalAnimeList {
    tvNewList: Array<SeasonalAnimeRelease>;
    tvConList: Array<SeasonalAnimeRelease>;
}