
import { SubTypes } from "../interfaces";

export type RootStackParamList = {
    "Home": undefined;
    "Latest Episodes": undefined;
    "Search": undefined;
    "Top Anime": { topType: SubTypes };
    "Watch Episode": {id: string; default_ep: number};
    "Episode Full Screen": {link: string};
    "Anime Details": {mal_id: number; url: string};
};