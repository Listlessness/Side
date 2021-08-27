import { LandingPage } from "../../pages/LandingPage";
import { LatestEpisodesPage } from "../../pages/LatestEpisodesPage";
import { TopAnimePage } from './../../pages/TopAnimePage/topAnime.page';

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
    }
}