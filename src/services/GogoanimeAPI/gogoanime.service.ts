import { GoGoAnime, GogoPagination, GogoRecentRelease } from './gogoanimeScraper'

class GogoAnimeAPI {
    gogoanime: GoGoAnime;

    constructor() {
        this.gogoanime = new GoGoAnime()
    }

    fetchRecentlyAddedEpisodes = (page?: number, type?: number) => {
        return this.gogoanime.recentRelease(page || 1, type || 1).then(resp => {
            return resp as GogoPagination<GogoRecentRelease>;
        })
    }
}

export const GogoAnimeService = new GogoAnimeAPI();

// // import AnimuGetter, { RecentlyAddedAnime } from "animu-desu";

// // class GogoAnimeAPI {
// //     // gogoanime: GoGoAnime;

// //     // constructor() {
// //     //     this.gogoanime = new GoGoAnime()
// //     // }

// //     fetchRecentlyAddedEpisodes = (page?: number, type?: number) => {
// //         return AnimuGetter.getRecentlyAdded(page || 1).then(resp => {
// //             return resp as RecentlyAddedAnime[];
// //         })
// //     }
// // }

// // export const GogoAnimeService = new GogoAnimeAPI();