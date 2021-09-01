import { GoGoAnime, GogoEntityBasic, GogoPagination, GogoRecentRelease, IAnimeEpisodeInfo } from './gogoanimeScraper'

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

    fetchEpisodeList = (movieId: string, ep_start: number, ep_end: number) => {
        return this.gogoanime.animeEpisodes(movieId, ep_start, ep_end).then(resp => {
            return resp as Array<GogoEntityBasic>;
        })
    }

    fetchEpisodeInfo = (id: string) => {
        return this.gogoanime.animeEpisodeInfo(id).then(resp => {
            return resp as IAnimeEpisodeInfo;
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