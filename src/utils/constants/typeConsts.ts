import { Days, Seasons, SearchTypes } from "../interfaces";


export {
    MonthSeason,
    MonthNumSeason,
    JikanDaysObj,
    JikanSearchAnimeSubType,
    JikanSearchRated,
    JikanSearchGenre,
    JikanSearchOrderBy,
    JikanSearchSort
};

export enum RECENT_RELEASE_TYPE {
    SUB = 1,
    DUB = 2,
    CHINESE = 3
}

export enum JikanTypes {
    Anime = 'anime',
    Manga = 'manga',
    People=  'people',
    Characters = 'characters'
}

export enum JikanAnimeSubTypes {
    Airing = 'airing',
    Upcoming = 'upcoming',
    TV = 'tv',
    Movie = 'movie',
    OVA = 'ova',
    Special = 'special',
    ByPopularity = 'bypopularity',
    Favorite = 'favorite'
}

export enum JikanMangaSubTypes {
    Manga = 'manga',
    Novels = 'novels',
    Oneshots = 'oneshots',
    Doujin = 'doujin',
    Manhwa = 'manhwa',
    Manhua = 'manhua',
    ByPopularity = 'bypopularity',
    Favorite = 'favorite'
}

export enum SeasonTypes {
    SPRING = 'spring',
    SUMMER = 'summer',
    FALL = 'fall',
    WINTER = 'winter'
}

export enum JikanSearchType {
    ANIME = 'anime',
    CHARACTER = 'character',
    PERSON = 'person',
    MANGA = 'manga',
}

const JikanSearchAnimeSubType = {
    MOVIE : 'movie',
    MUSIC : 'music',
    ONA : 'ona',
    OVA : 'ova',
    SPECIAL : 'special',
    TV : 'tv'
}

const JikanSearchMangaSubType = {
    MANGA : 'manga',
    DOUJIN : 'doujin',
    MANHUA : 'manhua',
    MANHWA : 'manhwa',
    MUSIC : 'music',
    ONESHOT : 'oneshot'
}

const JikanSearchRated = {
    G : 'g',
    PG : 'pg',
    PG13 : 'pg13',
    R17 : 'r17',
    R : 'r',
    RX : 'rx',
}

const JikanSearchGenre: {[index: string]: number} = {
    ACTION : 1,
    ADVENTURE : 2,
    CARS : 3,
    COMEDY : 4,
    DEMENTIA : 5,
    DEMONS : 6,
    MYSTERY : 7,
    DRAMA : 8,
    ECCHI : 9,
    FANTASY : 10,
    GAME : 11,
    HENTAI : 12,
    HISTORICAL : 13,
    HORROR : 14,
    KIDS : 15,
    MAGIC : 16,
    'MARTIAL ARTS' : 17,
    MECHA : 18,
    MUSIC : 19,
    PARODY : 20,
    SAMURAI : 21,
    ROMANCE : 22,
    SCHOOL : 23,
    'SCI FI' : 24,
    SHOUJO : 25,
    'SHOUJO AI' : 26,
    SHOUNEN : 27,
    'SHOUNEN AI' : 28,
    SPACE : 29,
    SPORTS : 30,
    'SUPER POWER' : 31,
    VAMPIRE : 32,
    YAOI : 33,
    YURI : 34,
    HAREM : 35,
    'SLICE OF LIFE' : 36,
    SUPERNATURAL : 37,
    MILITARY : 38,
    POLICE : 39,
    PSYCHOLOGICAL : 40,
    THRILLER : 41,
    SEINEN : 42,
    JOSEI : 43
}

const JikanSearchOrderBy =  {
    TITLE : 'title',
    START_DATE : 'start_date',
    END_DATE : 'end_date',
    SCORE : 'score',
    TYPE : 'type',
    MEMBER : 'members',
    // ID : 'id',
    EPISODES : 'episodes',
    RATING : 'rating'
}

const JikanSearchSort = {
    ASCENDING : 'ascending',
    DESCENDING : 'descending'
}

const MonthSeason: { [index: string] : Seasons } = {
    'january': SeasonTypes.WINTER,
    'february': SeasonTypes.WINTER,
    'march': SeasonTypes.WINTER,
    'april': SeasonTypes.SPRING,
    'may': SeasonTypes.SPRING,
    'june': SeasonTypes.SPRING,
    'july': SeasonTypes.SUMMER,
    'august': SeasonTypes.SUMMER,
    'september': SeasonTypes.SUMMER,
    'october': SeasonTypes.FALL,
    'november': SeasonTypes.FALL,
    'december': SeasonTypes.FALL,
}

const MonthNumSeason: { [index: number] : Seasons } = {
    0: SeasonTypes.WINTER,
    1: SeasonTypes.WINTER,
    2: SeasonTypes.WINTER,
    3: SeasonTypes.SPRING,
    4: SeasonTypes.SPRING,
    5: SeasonTypes.SPRING,
    6: SeasonTypes.SUMMER,
    7: SeasonTypes.SUMMER,
    8: SeasonTypes.SUMMER,
    9: SeasonTypes.FALL,
    10: SeasonTypes.FALL,
    11: SeasonTypes.FALL,
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


