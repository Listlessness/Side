import { MonthNumSeason, MonthSeason, SearchType } from "../model/objects";
import { EpisodesListSearch, SearchResult, Season, SeasonalAnimeType, SeasonalRelease } from "../model/types";

const malScraper = require('mal-scraper')

export {
    GetAnimeByTitle,
    GetAnimeByURL,
    SearchSeasonalRelease,
    GetCurrentSeasonalRelease,
    GetAnimeListInGenre,
}

async function GetAnimeByTitle(text: string) {
    return await malScraper.getInfoFromName(text)
    .then((result: SearchResult) => result)
    .catch((err :  string) => console.log(err))
}

async function GetAnimeByURL(url: string) {
    return await malScraper.getInfoFromURL(url)
    .then((data) => {
        
        return data;
    })
    .catch((err :  string) => console.log(err))
}

async function SearchSeasonalRelease(year: string, season: Season, type?: SeasonalAnimeType) {
    return await malScraper.getSeason(year, season, type)
    .then((data) => {
        
        return data;
    })
    .catch((err :  string) => console.log(err))
}

async function GetCurrentSeasonalRelease(type?: SeasonalAnimeType) {
    const currentDate = new Date();
    return await malScraper.getSeason(currentDate.getFullYear(), MonthNumSeason[currentDate.getMonth()], type)
    .then((data: SeasonalRelease) => {
        return data;
    })
    .catch((err :  string) => console.log(err))
}

async function GetAnimeListInGenre(selectedGenres: string[], currentLength: Number) {
    return await malScraper.search(SearchType.anime, {
        maxResults: 50,
        has: currentLength,
        genreType: 0, // 0 for include genre list, 1 for exclude genre list
        genres: selectedGenres
    })
    .then((data) => {
        
        return data;
    })
    .catch((err :  string) => console.log(err))
}

async function GetEpisodesList(anime: EpisodesListSearch) {
    return await malScraper.getEpisodesList(anime)
    .then((data) => {
        
        return data;
    })
    .catch((err :  string) => console.log(err))
}

