import { Days, Seasons, SearchTypes } from "../interfaces";


export {
    JikanTypesObj,
    JikanAnimeSubTypesObj,
    JikanMangaSubTypesObj,
    SeasonTypesObj,
    MonthSeason,
    MonthNumSeason,
    JikanDaysObj,
    JikanSearchTypeObj,
};

const enum JikanTypesObj {
    anime = 'anime',
    manga = 'manga',
    people=  'people',
    characters = 'characters'
}

const enum JikanAnimeSubTypesObj {
    airing = 'airing',
    upcoming = 'upcoming',
    tv = 'tv',
    movie = 'movie',
    ova = 'ova',
    special = 'special',
    bypopularity = 'bypopularity',
    favorite = 'favorite'
}

const enum JikanMangaSubTypesObj {
    manga = 'manga',
    novels = 'novels',
    oneshots = 'oneshots',
    doujin = 'doujin',
    manhwa = 'manhwa',
    manhua = 'manhua',
    bypopularity = 'bypopularity',
    favorite = 'favorite'
}

const enum SeasonTypesObj {
    SPRING = 'spring',
    SUMMER = 'summer',
    FALL = 'fall',
    WINTER = 'winter'
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

const JikanSearchTypeObj: { [index: string] : SearchTypes } = {
    anime : 'anime',
    character : 'character',
    doujin : 'doujin',
    manga : 'manga',
    manhua : 'manhua',
    manhwa : 'manhwa',
    movie : 'movie',
    music : 'music',
    novel : 'novel',
    ona : 'ona',
    oneshot : 'oneshot',
    ova : 'ova',
    person : 'person',
    special : 'special',
    tv : 'tv'
}


