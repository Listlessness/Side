import axios, { AxiosInstance, AxiosResponse } from "axios";
import { TMDB_Date, TMDB_Episode_Group_Details_Request, TMDB_Episode_Group_Details_Response, TMDB_Genres_Request, TMDB_Genres_Response, TMDB_Keyword_Details_Request, TMDB_Keyword_Details_Response, TMDB_Movie_Details_Request, TMDB_Movie_Details_Response, TMDB_Movie_Discover_Request, TMDB_Movie_Discover_Response, TMDB_Search_Keywords_Request, TMDB_Search_Keywords_Response, TMDB_TV_Details_Request, TMDB_TV_Details_Response, TMDB_TV_Discover_Request, TMDB_TV_Discover_Response, TMDB_TV_Seasons_Details_Request, TMDB_TV_Seasons_Details_Response } from "../../../utils";
import { tmdb_endpoints } from "./endpoints";

export default class TMDB_API {

    tmdbRequest: AxiosInstance;
    
    tmdb_image_config: { 
        baseURL: string;
        backdrop_sizes: string[];
        logo_sizes: string[];
        poster_sizes: string[];
        profile_sizes: string[];
        still_sizes: string[];
    };

    timezone: { iso_3166_1: string; zones: string[]; };
    country: { iso_3166_1: string; english_name: string; native_name: string; };
    anime_keyword_id: number;

    constructor() {
        this.tmdbRequest = axios.create({
            baseURL: 'https://api.themoviedb.org/3',
            timeout: 50000,
            headers: {},
            params: {
                api_key: 'f095ecfc0b37ca37e482e1c746e65e89'
            },
            paramsSerializer: function (params: any) {
                var query: string[] = []
                for (const [key, value] of Object.entries(params)) {
                    if (value !== undefined) query.push(`${key}=${Array.isArray(value) ? value.join(',') : value}`)
                }
                return query.join('&')
            }
        });

        this.tmdb_image_config = {
            baseURL: "https://image.tmdb.org/t/p",
            backdrop_sizes: ["w300","w780","w1280","original"],
            logo_sizes: ["w45","w92","w154","w185","w300","w500","original"],
            poster_sizes: ["w92","w154","w185","w342","w500","w780","original"],
            profile_sizes: ["w45","w185","h632","original"],
            still_sizes: ["w92","w185","w300","original"]
        }

        this.timezone = {"iso_3166_1": "JP", "zones": ["Asia/Tokyo"]}

        this.country = {"iso_3166_1": "JP", "english_name": "Japan", "native_name": "Japan"}

        this.anime_keyword_id = 210024
    }

    FetchAnimeKeywordId = async () => {
        var request: TMDB_Search_Keywords_Request = {
            params: { query: 'anime' } 
        }

        await this.tmdbRequest.get<TMDB_Search_Keywords_Response>(tmdb_endpoints.search.keywords(), {
            params: request.params
        }).then((response) => {
            let item = response.data.results?.find(result => result.name?.toLowerCase() === 'anime')
            this.anime_keyword_id =  item?.id ? item.id : 210024
        }).catch(() => {
            this.anime_keyword_id = 210024
        })
    }

    generateBackdropURI = (path: string) => {
        return `${this.tmdb_image_config.baseURL}/${this.tmdb_image_config.backdrop_sizes[2]}${path}`
    }

    generateLogoURI = (path: string) => {
        return `${this.tmdb_image_config.baseURL}/${this.tmdb_image_config.logo_sizes[5]}${path}`
    }

    generatePosterURI = (path: string) => {
        return `${this.tmdb_image_config.baseURL}/${this.tmdb_image_config.poster_sizes[5]}${path}`
    }

    generateProfileImageURI = (path: string) => {
        return `${this.tmdb_image_config.baseURL}/${this.tmdb_image_config.logo_sizes[1]}${path}`
    }

    generateStillImageURI = (path: string) => {
        return `${this.tmdb_image_config.baseURL}/${this.tmdb_image_config.logo_sizes[2]}${path}`
    }

    toJapanDate = (input_date: TMDB_Date) => {
        return new Date(
            input_date.getDate().toLocaleString('en-US', {
                timeZone: this.timezone.zones[0]
            })
        ).toISOString().split('T')[0]
    }

    GetAnimeKeywordId = () => this.anime_keyword_id;

    GetJapanTimezone = () => this.timezone.zones[0]

    IMDB_Discover_Movie = async (request: TMDB_Movie_Discover_Request) => {
        return await this.tmdbRequest.get<TMDB_Movie_Discover_Response>(tmdb_endpoints.discover.movie(), {
            params: request.params
        }).then(resp => resp.data)
    }

    IMDB_Discover_TV = async (request: TMDB_TV_Discover_Request) => {
        return await this.tmdbRequest.get<TMDB_TV_Discover_Response>(tmdb_endpoints.discover.tv(), {
            params: request.params
        }).then(resp => resp.data)
    }

    IMDB_Episode_Group_Details = async (request: TMDB_Episode_Group_Details_Request) => {
        return await this.tmdbRequest.get<TMDB_Episode_Group_Details_Response>(tmdb_endpoints.episode_groups(request.path.id), {
            params: request.params
        }).then(resp => resp.data)
    }

    IMDB_Movie_Genres = async (request: TMDB_Genres_Request) => {
        return await this.tmdbRequest.get<TMDB_Genres_Response>(tmdb_endpoints.genres.movie(), {
            params: request.params
        }).then(resp => resp.data)
    }

    IMDB_TV_Genres = async (request: TMDB_Genres_Request) => {
        return await this.tmdbRequest.get<TMDB_Genres_Response>(tmdb_endpoints.genres.tv(), {
            params: request.params
        }).then(resp => resp.data)
    }

    IMDB_Keywords = async (request: TMDB_Keyword_Details_Request) => {
        return await this.tmdbRequest.get<TMDB_Keyword_Details_Response>(tmdb_endpoints.keywords.details(request.path.keyword_id))
    }

    IMDB_Movie_Details = async (request: TMDB_Movie_Details_Request) => {
        return await this.tmdbRequest.get<TMDB_Movie_Details_Response>(tmdb_endpoints.movies.details(request.path.movie_id), {
            params: request.params
        }).then(resp => resp.data)
    }

    IMDB_TV_Details = async (request: TMDB_TV_Details_Request) => {
        return await this.tmdbRequest.get<TMDB_TV_Details_Response>(tmdb_endpoints.tv.details(request.path.tv_id), {
            params: request.params
        }).then(resp => resp.data)
    }

    IMDB_TV_Season_Details = async (request: TMDB_TV_Seasons_Details_Request) => {
        return await this.tmdbRequest.get<TMDB_TV_Seasons_Details_Response>(tmdb_endpoints.tv_season.details(request.path.tv_id, request.path.season_number), {
            params: request.params
        }).then(resp => resp.data)
    }
}