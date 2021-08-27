import {
    Types, SubTypes, AnimeById, CharactersStaff, Days, Filters,
    Recommendations, ScheduleResult, SearchTypes, SeasonLater, 
    SeasonResult, Seasons, TopResult, MonthNumSeason, SearchResult 
} from '../../utils';
import axios, { AxiosInstance } from 'axios';
import { anime_request_endpoints, endpoints } from './endpoints';
import handleResponse from './RequestDecorator';


export class JikanService {
    jikanRequest: AxiosInstance;

    constructor() {
        this.jikanRequest = axios.create({
            baseURL: 'https://api.jikan.moe/v3',
            timeout: 10000,
            headers: {}
          });
    }

    @handleResponse
    fetchTop(type: Types, page?: number, subtype?: SubTypes) {

        let path = `${endpoints.top}/${type}/${page || 1}`;

        if (subtype !== undefined) path = `${path}/${subtype}`;

        return this.jikanRequest.get<TopResult>(path)
                            .then(resp => resp.data as TopResult);
    }

    @handleResponse
    async fetchSeason(year?: number, season?: Seasons) {

        if (year === undefined) year = new Date().getFullYear();
        if (season === undefined) season = MonthNumSeason[new Date().getMonth()];

        let path = `${endpoints.season}`;

        if (year !== undefined) path = `${path}/${year}`;
        if (season !== undefined) path = `${path}/${season}`;

        return this.jikanRequest.get<SeasonResult>(path)
                    .then(resp => resp.data as SeasonResult);
    }

    @handleResponse
    async fetchUpcomingAnime() {

        let path = `${endpoints.season_later}`;

        return this.jikanRequest.get<SeasonLater>(path)
                        .then(resp => resp.data as SeasonLater);
    }

    @handleResponse
    async fetchAnime(id: number) {
        let path = `${endpoints.anime}/${id}`;

        return this.jikanRequest.get<AnimeById>(path)
                        .then(resp => resp.data as AnimeById);
    }

    @handleResponse
    async fetchCharacters4Anime(id: number) {
        let path = `${endpoints.anime}/${id}/${anime_request_endpoints.characters_staff}`;

        return this.jikanRequest.get<CharactersStaff>(path)
                            .then(resp => resp.data as CharactersStaff);
    }

    @handleResponse
    async fetchRecommendations4Anime(id: number) {
        let path = `${endpoints.anime}/${id}/${anime_request_endpoints.recommendations}`;

        return this.jikanRequest.get<Recommendations>(path)
                        .then(resp => resp.data as Recommendations);
    }

    @handleResponse
    async fetchReviews4Anime(id: number) {
        let path = `${endpoints.anime}/${id}/${anime_request_endpoints.reviews}`;

        return this.jikanRequest.get<Recommendations>(path)
                        .then(resp => resp.data as Recommendations);
    }

    @handleResponse
    async fetchSchedule(day: Days) {
        let path = `${endpoints.schedule}/${day}`;

        return this.jikanRequest.get<ScheduleResult>(path)
                            .then(resp => resp.data as ScheduleResult);
    }

    @handleResponse
    async DoSearch(query: string, searchType: SearchTypes, page?: number, filters?: Filters) {
        let path = `${endpoints.search}/${searchType}`;

        let params: {[index: string]: any} = {
            'q': query,
            'page': page || 1
        }

        if (filters?.genre !== undefined) params['genre'] = filters.genre;

        return this.jikanRequest.get<SearchResult>(path, {
            params: params
        }).then(resp => resp.data as SearchResult);
    }
};

