
import { SubTypes } from "../interfaces";

export type RootStackParamList = {
    "Home": undefined;
    "Latest Episodes": undefined;
    "Search": undefined;
    "Top Anime": { topType: SubTypes };
    "Watch Episode": {movieId: string; ep_start: number; ep_end: number; default_ep: number};
};