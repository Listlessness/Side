import { Season, SeasonalAnimeType } from "./types";

export {
    SearchType,
    SeasonTypeObj,
    SeasonAnimeTypesObj,
    MonthSeason,
    MonthNumSeason
}

const SearchType = {
    anime: 'anime',
    manga: 'manga'
}

const SeasonTypeObj: { [index: string] : Season } = {
    SPRING: 'spring',
    SUMMER: 'summer',
    FALL: 'fall',
    WINTER: 'winter'
}

const MonthSeason: { [index: string] : Season } = {
    'january': SeasonTypeObj.WINTER,
    'february': SeasonTypeObj.WINTER,
    'march': SeasonTypeObj.WINTER,
    'april': SeasonTypeObj.SPRING,
    'may': SeasonTypeObj.SPRING,
    'june': SeasonTypeObj.SPRING,
    'july': SeasonTypeObj.SUMMER,
    'august': SeasonTypeObj.SUMMER,
    'september': SeasonTypeObj.SUMMER,
    'october': SeasonTypeObj.FALL,
    'november': SeasonTypeObj.FALL,
    'december': SeasonTypeObj.FALL,
}

const MonthNumSeason: { [index: number] : Season } = {
    0: SeasonTypeObj.WINTER,
    1: SeasonTypeObj.WINTER,
    2: SeasonTypeObj.WINTER,
    3: SeasonTypeObj.SPRING,
    4: SeasonTypeObj.SPRING,
    5: SeasonTypeObj.SPRING,
    6: SeasonTypeObj.SUMMER,
    7: SeasonTypeObj.SUMMER,
    8: SeasonTypeObj.SUMMER,
    9: SeasonTypeObj.FALL,
    10: SeasonTypeObj.FALL,
    11: SeasonTypeObj.FALL,
}

const SeasonAnimeTypesObj: {[index: string]: SeasonalAnimeType} = {
    TV: 'TV',
    TVNew: 'TVNew',
    TVCon: 'TVCon',
    ONAs: 'ONAs',
    OVAs: 'OVAs',
    Specials: 'Specials',
    Movies: 'Movies'
}