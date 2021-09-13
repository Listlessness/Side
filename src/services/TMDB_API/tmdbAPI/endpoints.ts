const tmdb_endpoint_types = {
    movie: 'movie',
    tv: 'tv',
    genre: 'genre',
    discover: 'discover',
    configuration: 'configuration',
    keyword: 'keyword',
    collection: 'collection',
    search: 'search'
}

export const tmdb_endpoints = {
    search: {
        keywords: () => `/${tmdb_endpoint_types.search}/${tmdb_endpoint_types.keyword}`,
        movie: () => `/${tmdb_endpoint_types.search}/${tmdb_endpoint_types.movie}`,
        tv: () => `/${tmdb_endpoint_types.search}/${tmdb_endpoint_types.tv}`
    },
    discover: {
        movie: () => `/${tmdb_endpoint_types.discover}/${tmdb_endpoint_types.movie}`,
        tv: () => `/${tmdb_endpoint_types.discover}/${tmdb_endpoint_types.tv}`
    },
    collections: () => `/${tmdb_endpoint_types.collection}`,
    configurations: {
        api_config: () => `/${tmdb_endpoint_types.configuration}`,
        timezone: () => `/${tmdb_endpoint_types.configuration}/timezones`,
        languages: () => `/${tmdb_endpoint_types.configuration}/languages`
    },
    episode_groups: (id: number) => `/${tmdb_endpoint_types.tv}/episode_group/${id}`,
    genres: {
        movie: () => `/${tmdb_endpoint_types.genre}/${tmdb_endpoint_types.movie}/list`,
        tv: () => `/${tmdb_endpoint_types.genre}/${tmdb_endpoint_types.tv}/list`
    },
    keywords: {
        details: (keyword_id: number) => `/${tmdb_endpoint_types.keyword}/${keyword_id}`
    },
    movies: {
        details: (movie_id: number) => `/${tmdb_endpoint_types.movie}/${movie_id}`,
        external_ids: (movie_id: number) => `/${tmdb_endpoint_types.movie}/${movie_id}/external_ids`,
        recommendations: (movie_id: number) => `/${tmdb_endpoint_types.movie}/${movie_id}/recommendations`,
        similar_movies: (movie_id: number) => `/${tmdb_endpoint_types.movie}/${movie_id}/similar`,
        videos: (movie_id: number) => `/${tmdb_endpoint_types.movie}/${movie_id}/videos`,
    },
    tv: {
        details: (tv_id: number) => `/${tmdb_endpoint_types.tv}/${tv_id}`,
        external_ids: (tv_id: number) => `/${tmdb_endpoint_types.tv}/${tv_id}/external_ids`,
        recommendations: (tv_id: number) => `/${tmdb_endpoint_types.tv}/${tv_id}/recommendations`,
        similar_tv_shows: (tv_id: number) => `/${tmdb_endpoint_types.tv}/${tv_id}/similar`,
        videos: (tv_id: number) => `/${tmdb_endpoint_types.tv}/${tv_id}/videos`,
        episode_groups: (tv_id: number) => `/${tmdb_endpoint_types.tv}/${tv_id}/episode_groups`,
        content_ratings: (tv_id: number) => `/${tmdb_endpoint_types.tv}/${tv_id}/content_ratings`,
    },
    tv_season: {
        details: (tv_id: number, season_number: number) =>  `/${tmdb_endpoint_types.tv}/${tv_id}/season/${season_number}`,
        videos: (tv_id: number, season_number: number) => `/${tmdb_endpoint_types.tv}/${tv_id}/season/${season_number}/videos`,
    }
}