import { TMDB_Movie_Discover_Request, TMDB_TV_Discover_Request } from '../../utils';
import handleResponse from './tmdbAPI/requestDecorators';
import TMDB_API from './tmdbAPI/tmdb_api';

export default class TMDB_Service {
    static tmdbAPI = new TMDB_API()

    constructor() {

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