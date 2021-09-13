import { TMDBService } from "../../../services"
import { TMDB_Date, TMDB_TV_Discover_Request } from "../../../utils"

export {
    TV_AT_AR
}

const TV_AT_AR: TMDB_TV_Discover_Request = {
    params: {
        'air_date.lte': new TMDB_Date(),
        timezone: TMDBService.getJapanTimezone(),
        with_keywords: [TMDBService.getAnimeKeywordId()],
    }
}