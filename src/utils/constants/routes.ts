import { LandingPage, LatestEpisodesPage, SearchPage, TopAnimePage } from "../../pages";
import { SubTypes } from "../interfaces";

export type RootStackParamList = {
    "Home": undefined;
    "Latest Episodes": undefined;
    "Search": undefined;
    "Top Anime": { topType: SubTypes }
};

export const Screens = {
    LANDING_PAGE: {
        name: "Home",
        component: LandingPage,
    },
    LATEST_EPISODES_PAGE: {
        name: "Latest Episodes",
        component: LatestEpisodesPage
    },
    TOP_ANIME_PAGE: {
        name: "Top Anime",
        component: TopAnimePage
    },
    SEARCH_PAGE: {
        name: "Search",
        component: SearchPage
    }
}