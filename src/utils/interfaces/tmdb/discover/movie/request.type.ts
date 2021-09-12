import { TMDB_Date } from "../../utils"

export type {
    TMDB_Movie_Discover_Request
}

interface TMDB_Movie_Discover_Request {
    page?: number,
    language?: string,
    region?: string,
    sort_by?: TMDB_Movie_Discover_SortBy,
    certification_country?: string, // Used in conjunction with the certification filter, use this to specify a country with a valid certification.
    certification?: string, // Filter results with a valid certification from the 'certification_country' field.
    'certification.lte'?: string, // Filter and only include movies that have a certification that is less than or equal to the specified value.
    'certification.gte'?: string, // Filter and only include movies that have a certification that is greater than or equal to the specified value.
    include_adult?: boolean,
    include_video?: boolean,
    primary_release_year?: number,
    'primary_release_date.gte'?: TMDB_Date,
    'primary_release_date.lte'?: TMDB_Date,
    'release_date.gte'?: TMDB_Date,
    'release_date.lte'?: TMDB_Date,
    'with_release_type'?: number[], // Specify a comma (AND) or pipe (OR) separated value to filter release types by. These release types map to the same values found on the movie release date method.
    year: number,
    'vote_average.gte'?: number,
    'vote_average.lte'?: number,
    'vote_count.lte'?: number,
    'vote_count.gte'?: number,
    with_cast?: string[], // A comma separated list of person ID's. Only include movies that have one of the ID's added as an actor.
    with_crew?: string[], // A comma separated list of person ID's. Only include movies that have one of the ID's added as a crew member.
    with_people?: string[], // A comma separated list of person ID's. Only include movies that have one of the ID's added as a either a actor or a crew member.
    with_companies?: string[], // A comma separated list of production company ID's. Only include movies that have one of the ID's added as a production company.
    with_genres?: string[], // comma separated
    without_genres?: string[], // comma separated
    without_keywords?: number[] // comma and pipe seperate these values to create an 'AND' or 'OR' logic.
    with_keywords?: number[], // comma separated list of keyword ID's. Only includes TMDB_Movie shows that have one of the ID's added as a keyword.
    'with_runtime.gte'?: number,
    'with_runtime.lte'?: number,
    with_original_language?: string,
    with_watch_providers?: string[], // comma or pipe separated list of watch provider ID's. Combine this filter with watch_region in order to filter your results by a specific watch provider in a specific region.
    watch_region?: string, // ISO 3166-1 code. Combine this filter with with_watch_providers in order to filter your results by a specific watch provider in a specific region.
    with_watch_monetization_types?: TMDB_Movie_Discover_Watch_Monetization_Types
}

enum TMDB_Movie_Discover_SortBy {
    VoteAvg_Desc = 'vote_average.desc',
    VoteAvg_Asc = 'vote_average.asc',
    FirstAirDate_Desc = 'first_air_date.desc',
    FirstAirDate_Asc = 'first_air_date.asc',
    Popularity_Desc = 'popularity.desc',
    Popularity_Asc = 'popularity.asc'
}

enum TMDB_Movie_Discover_Watch_Monetization_Types {
    Flatrate = 'flatrate',
    Free = 'free',
    Ads = 'ads',
    Rent = 'rent',
    Buy = 'buy'
}
