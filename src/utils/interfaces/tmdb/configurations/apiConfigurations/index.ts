export type {
    TMDB_API_Configuration_Response
}

interface TMDB_API_Configuration_Response {  
    images: TMDB_API_Configuration_Images,
    change_keys?: string[]
}

interface TMDB_API_Configuration_Images {  
    base_url?: string,
    secure_base_url?: string,
    backdrop_sizes?: string[],
    logo_sizes?: string[],
    poster_sizes?: string[],
    profile_sizes?: string[],
    still_sizes?: string[],
}