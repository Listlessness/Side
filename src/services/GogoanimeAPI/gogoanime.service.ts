import { GoGoAnime, IPagination, IRecentRelease } from 'gogoanime-api';

export class GogoAnimeAPI {
    gogoanime: GoGoAnime;

    constructor() {
        this.gogoanime = new GoGoAnime()
    }

    fetchRecentlyAddedEpisodes = (page?: number) => {
        return this.gogoanime.recentRelease(page || 1).then(resp => {
            return resp as IPagination<IRecentRelease>;
        })
    }
}