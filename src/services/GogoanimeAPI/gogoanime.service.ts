import { GogoEntityBasic, GogoPagination, GogoRecentRelease, IAnime, IAnimeEpisodeInfo } from "../../utils";
import { GoGoAnime } from "./gogoanimeScraper";

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
            return resp.reverse() as Array<GogoEntityBasic>;
        })
    }

    fetchEpisodeInfo = (id: string) => {
        return this.gogoanime.animeEpisodeInfo(id).then(resp => {
            return resp as IAnimeEpisodeInfo;
        })
    }

    searchAnime = async (query: string) => {
        return await this.gogoanime.searchAjax(query).then(async (resp) => {
            let finalList: IAnime[] = []
            await Promise.all( resp.map( item => this.gogoanime.animeInfo(item.id) ) ).then(animeItems => {
                finalList = animeItems
            }).catch(reason => {
                throw reason
            })
            return finalList
        })
    }

    GetVideoUrl = (movieId: string) => {
        return `${this.gogoanime.getVideoApiUrl()}?id=${movieId}`
    }

    // fetchEpisodeVideo = (videoId: string) => {
    //     return this.gogoanime.animeEpisodeVideo(videoId).then(resp => {
    //         return resp as IVideoRes;
    //     })
    // }
}

export const GogoAnimeService = new GogoAnimeAPI();