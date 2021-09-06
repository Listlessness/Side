export {
    extractEpisodeNumer
}

const extractEpisodeNumer = (episode: string) => Number(episode.toLowerCase().replace(/^(episode)\s*/g, ''))