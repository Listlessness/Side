
import { SeasonResult, SeasonAnime, SubTypes } from "../interfaces";

export type RootStackParamList = {
    "Home": undefined;
    "Latest Episodes": undefined;
    "Search": undefined;
    "Top Anime": { topType: SubTypes };
    "Watch Episode": {episodeId?: string; movieId?: string; default_ep?: number};
    "Episode Full Screen": {link: string};
    "Anime Details": {mal_id: number; url: string};
    "Simple List": SimpleListPageParams;
    "Genres": undefined,
    "Bookmarked Anime": undefined
};

interface SimpleListPageParams {
    fetchItems: () => Promise<any>;
    itemsExtracter: (response: any) => any[];
    renderItem:  (arg: {item: any, index: number}) => JSX.Element;
    currPageExtracter?: (...args: any[]) => number,
    nameExtracter: (response: any) => string;
    numColumns?: number
}