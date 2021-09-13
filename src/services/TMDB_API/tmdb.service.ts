import { TMDB_Movie_Discover_Request, TMDB_TV_Discover_Request } from '../../utils';
import handleResponse from './tmdbAPI/requestDecorators';
import TMDB_API from './tmdbAPI/tmdb_api';

export default class TMDB_Service {
    static tmdbAPI = new TMDB_API()

    constructor() {

    }

    getAnimeKeywordId() {
        return TMDB_Service.tmdbAPI.GetAnimeKeywordId()
    }

    getJapanTimezone() {
        return TMDB_Service.tmdbAPI.GetJapanTimezone();
    }

    generateBackdropURI = (path?: string | null) => {
        return path ? TMDB_Service.tmdbAPI.generateBackdropURI(path) : ''
    }

    generateLogoURI = (path?: string | null) => {
        return path ? TMDB_Service.tmdbAPI.generateLogoURI(path) : ''
    }

    generatePosterURI = (path?: string | null) => {
        return path ? TMDB_Service.tmdbAPI.generatePosterURI(path) : ''
    }

    generateProfileImageURI = (path?: string | null) => {
        return path ? TMDB_Service.tmdbAPI.generateProfileImageURI(path) : ''
    }

    generateStillImageURI = (path?: string | null) => {
        return path ? TMDB_Service.tmdbAPI.generateStillImageURI(path) : ''
    }

    @handleResponse
    async discoverMovie(request: TMDB_Movie_Discover_Request) {
        return await TMDB_Service.tmdbAPI.IMDB_Discover_Movie(request)
    }

    @handleResponse
    async discoverTV(request: TMDB_TV_Discover_Request) {
        return await TMDB_Service.tmdbAPI.IMDB_Discover_TV(request)
    }

}