import { LandingPage } from "../../pages/LandingPage";
import { LatestEpisodesPage } from "../../pages/LatestEpisodesPage";
import { SubTypes } from "../interfaces";
import { TopAnimePage } from './../../pages/TopAnimePage/topAnime.page';

type ScreenProps = {name: keyof RootStackParamList, component: any};

export const Screens : {LANDING_PAGE: ScreenProps, LATEST_EPISODES_PAGE: ScreenProps, TOP_ANIME_PAGE: ScreenProps} = {
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
    }
}

Screens

export type RootStackParamList = {
    "Home": undefined;
    "Latest Episodes": undefined;
    "Top Anime": { topType: SubTypes }
};