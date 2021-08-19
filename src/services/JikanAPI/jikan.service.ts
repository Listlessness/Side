import { JikanInterfaces, Constants } from '../../utils';
import axios, { AxiosInstance } from 'axios';
import { anime_request_endpoints, endpoints } from './endpoints';
import handleResponse from './RequestDecorator';


export class JikanService {
    jikanRequest: AxiosInstance;

    constructor() {
        this.jikanRequest = axios.create({
            baseURL: 'https://api.jikan.moe/v3',
            timeout: 1000,
            headers: {}
          });
    }

    @handleResponse
    fetchTop(type: JikanInterfaces.Types, page?: number, subtype?: JikanInterfaces.SubTypes) {

        let path = `${endpoints.top}/${page || 1}`;

        if (subtype !== undefined) path = `${path}/${subtype}`;

        return this.jikanRequest.get<JikanInterfaces.TopResult>(path)
                            .then(resp => resp.data as JikanInterfaces.TopResult);
    }

    @handleResponse
    async fetchSeason(year?: number, season?: JikanInterfaces.Seasons) {

        if (year === undefined) year = new Date().getFullYear();
        if (season === undefined) season = Constants.MonthNumSeason[new Date().getMonth()];

        let path = `${endpoints.season}`;

        if (year !== undefined) path = `${path}/${year}`;
        if (season !== undefined) path = `${path}/${season}`;

        return this.jikanRequest.get<JikanInterfaces.SeasonResult>(path)
                    .then(resp => resp.data as JikanInterfaces.SeasonResult);
    }

    @handleResponse
    async fetchUpcomingAnime() {

        let path = `${endpoints.season_later}`;

        return this.jikanRequest.get<JikanInterfaces.SeasonLater>(path)
                        .then(resp => resp.data as JikanInterfaces.SeasonLater);
    }

    @handleResponse
    async fetchAnime(id: number) {
        let path = `${endpoints.anime}/${id}`;

        return this.jikanRequest.get<JikanInterfaces.AnimeById>(path)
                        .then(resp => resp.data as JikanInterfaces.AnimeById);
    }

    @handleResponse
    async fetchCharacters4Anime(id: number) {
        let path = `${endpoints.anime}/${id}/${anime_request_endpoints.characters_staff}`;

        return this.jikanRequest.get<JikanInterfaces.CharactersStaff>(path)
                            .then(resp => resp.data as JikanInterfaces.CharactersStaff);
    }

    @handleResponse
    async fetchRecommendations4Anime(id: number) {
        let path = `${endpoints.anime}/${id}/${anime_request_endpoints.recommendations}`;

        return this.jikanRequest.get<JikanInterfaces.Recommendations>(path)
                        .then(resp => resp.data as JikanInterfaces.Recommendations);
    }

    @handleResponse
    async fetchReviews4Anime(id: number) {
        let path = `${endpoints.anime}/${id}/${anime_request_endpoints.reviews}`;

        return this.jikanRequest.get<JikanInterfaces.Recommendations>(path)
                        .then(resp => resp.data as JikanInterfaces.Recommendations);
    }

    @handleResponse
    async fetchSchedule(day: JikanInterfaces.Days) {
        let path = `${endpoints.schedule}/${day}`;

        return this.jikanRequest.get<JikanInterfaces.ScheduleResult>(path)
                            .then(resp => resp.data as JikanInterfaces.ScheduleResult);
    }

    @handleResponse
    async DoSearch(query: string, searchType: JikanInterfaces.SearchTypes, page?: number, filters?: JikanInterfaces.Filters) {
        let path = `${endpoints.search}/${searchType}`;

        let params: {[index: string]: any} = {
            'q': query,
            'page': page || 1
        }

        if (filters?.genre !== undefined) params['genre'] = filters.genre;

        return this.jikanRequest.get<JikanInterfaces.ScheduleResult>(path, {
            params: params
        }).then(resp => resp.data as JikanInterfaces.ScheduleResult);
    }
};

