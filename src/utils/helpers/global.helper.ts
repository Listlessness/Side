import { GogoRecentRelease } from "../../services/GogoanimeAPI/gogoanimeScraper";

export {
    extractEpisodeNumer
}

const extractEpisodeNumer = (item: GogoRecentRelease) => Number(item.episode.toLowerCase().replace(/^(episode)\s*/g, ''))