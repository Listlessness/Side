import { Days, Seasons, SearchTypes } from "../interfaces";


export {
    MonthSeason,
    MonthNumSeason,
    JikanDaysObj
};

export enum RECENT_RELEASE_TYPE {
    SUB = 1,
    DUB = 2,
    CHINESE = 3
}

export enum JikanTypesObj {
    Anime = 'anime',
    Manga = 'manga',
    People=  'people',
    Characters = 'characters'
}

export enum JikanAnimeSubTypesObj {
    Airing = 'airing',
    Upcoming = 'upcoming',
    TV = 'tv',
    Movie = 'movie',
    OVA = 'ova',
    Special = 'special',
    ByPopularity = 'bypopularity',
    Favorite = 'favorite'
}

export enum JikanMangaSubTypesObj {
    Manga = 'manga',
    Novels = 'novels',
    Oneshots = 'oneshots',
    Doujin = 'doujin',
    Manhwa = 'manhwa',
    Manhua = 'manhua',
    ByPopularity = 'bypopularity',
    Favorite = 'favorite'
}

export enum SeasonTypesObj {
    SPRING = 'spring',
    SUMMER = 'summer',
    FALL = 'fall',
    WINTER = 'winter'
}

export enum JikanSearchTypeObj {
    ANIME = 'anime',
    CHARACTER = 'character',
    PERSON = 'person',
    MANGA = 'manga',
}

export enum JikanSearchAnimeSubTypeObj {
    MOVIE = 'movie',
    MUSIC = 'music',
    ONA = 'ona',
    OVA = 'ova',
    SPECIAL = 'special',
    TV = 'tv'
}

export enum JikanSearchMangaSubTypeObj {
    MANGA = 'manga',
    DOUJIN = 'doujin',
    MANHUA = 'manhua',
    MANHWA = 'manhwa',
    MUSIC = 'music',
    ONESHOT = 'oneshot'
}

const MonthSeason: { [index: string] : Seasons } = {
    'january': SeasonTypesObj.WINTER,
    'february': SeasonTypesObj.WINTER,
    'march': SeasonTypesObj.WINTER,
    'april': SeasonTypesObj.SPRING,
    'may': SeasonTypesObj.SPRING,
    'june': SeasonTypesObj.SPRING,
    'july': SeasonTypesObj.SUMMER,
    'august': SeasonTypesObj.SUMMER,
    'september': SeasonTypesObj.SUMMER,
    'october': SeasonTypesObj.FALL,
    'november': SeasonTypesObj.FALL,
    'december': SeasonTypesObj.FALL,
}

const MonthNumSeason: { [index: number] : Seasons } = {
    0: SeasonTypesObj.WINTER,
    1: SeasonTypesObj.WINTER,
    2: SeasonTypesObj.WINTER,
    3: SeasonTypesObj.SPRING,
    4: SeasonTypesObj.SPRING,
    5: SeasonTypesObj.SPRING,
    6: SeasonTypesObj.SUMMER,
    7: SeasonTypesObj.SUMMER,
    8: SeasonTypesObj.SUMMER,
    9: SeasonTypesObj.FALL,
    10: SeasonTypesObj.FALL,
    11: SeasonTypesObj.FALL,
}

const JikanDaysObj: { [index: string] : Days } = {
    monday : 'monday',
    tuesday : 'tuesday',
    wednesday : 'wednesday',
    thursday : 'thursday',
    friday : 'friday',
    saturday : 'saturday',
    sunday : 'sunday',
    other : 'other'
}


