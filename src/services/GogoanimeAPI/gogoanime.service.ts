import { GoGoAnime, IPagination, IRecentRelease } from 'gogoanime-api';

export class GogoAnimeAPI {
    gogoanime: GoGoAnime;

    constructor() {
        this.gogoanime = new GoGoAnime()
    }

    fetchRecentlyAddedEpisodes = (page?: number, type?: number) => {
        return this.gogoanime.recentRelease(page || 1, type || 1).then(resp => {
            return resp as IPagination<IRecentRelease>;
        })
    }
}