import { TMDB_Date } from "../../utils"

export type {
    TMDB_TV_Discover_Request
}

interface TMDB_TV_Discover_Request {
    params: {
        page?: number,
        language?: string,
        sort_by?: TMDB_TV_Discover_SortBy,
        'air_date.gte'?: TMDB_Date,
        'air_date.lte'?: TMDB_Date,
        'first_air_date.gte'?: TMDB_Date,
        'first_air_date.lte'?: TMDB_Date,
        first_air_date_year?: number,
        timezone?: string,
        'vote_average.gte'?: number,
        'vote_count.gte'?: number,
        with_genres?: string[], // comma separated
        with_networks?: string[], // comma separated
        without_genres?: string[], // comma separated
        'with_runtime.gte'?: number,
        'with_runtime.lte'?: number,
        include_null_first_air_dates?: boolean,
        without_keywords?: number[], // comma and pipe seperate these values to create an 'AND' or 'OR' logic.
        screened_theatrically?: boolean,
        with_companies?: string[], // comma separated
        with_keywords?: number[], // comma separated list of keyword ID's. Only includes TMDB_TV shows that have one of the ID's added as a keyword.
        with_watch_providers?: string[], // comma or pipe separated list of watch provider ID's. Combine this filter with watch_region in order to filter your results by a specific watch provider in a specific region.
        watch_region?: string, // ISO 3166-1 code. Combine this filter with with_watch_providers in order to filter your results by a specific watch provider in a specific region.
        with_watch_monetization_types?: TMDB_TV_Discover_Watch_Monetization_Types
    }
}

enum TMDB_TV_Discover_SortBy {
    VoteAvg_Desc = 'vote_average.desc',
    VoteAvg_Asc = 'vote_average.asc',
    FirstAirDate_Desc = 'first_air_date.desc',
    FirstAirDate_Asc = 'first_air_date.asc',
    Popularity_Desc = 'popularity.desc',
    Popularity_Asc = 'popularity.asc'
}

enum TMDB_TV_Discover_Watch_Monetization_Types {
    Flatrate = 'flatrate',
    Free = 'free',
    Ads = 'ads',
    Rent = 'rent',
    Buy = 'buy'
}
