export type {
    Anime,
    AnimeSearchResult,
    Character,
    Staff,
    Seiyuu,
    SearchResult,
    SearchResultPayload,
    SeasonalRelease,
    SeasonalAnimeRelease,
    SeasonalAnimeType,
    Rating,
    Season,
    EpisodesListSearch,
    SearchType
}

type SearchType = 'anime' | 'manga';

type Season = 'spring' | 'summer' | 'fall' | 'winter';

type SeasonalAnimeType = 'TV' | 'TVNew' | 'TVCon' | 'ONAs' | 'OVAs' | 'Specials' | 'Movies';

type Rating = 'G' | 'PG' | 'PG-13' | 'R' | 'R+' | 'Rx';



interface EpisodesListSearch {
    name:  string;  // The name of the anime
    id:  Number;  // The unique identifier of this anime
}

interface Anime {
    title:  string;  // The title of the anime
    synopsis:  string;  // The synopsis of the anime
    picture:  string;  // The URL of the cover picture of the anime
    characters:  Array<Character>;  // An array of Character data model objects
    staff:  Array<Staff>;  // An array of Staff data model objects
    trailer:  string;  // URL to the embedded video
    englishTitle:  string;  // The english title of the anime
    synonyms:  string;  // A list of synonyms of the anime title (other languages names, related ovas/movies/animes) separated by commas, like "Sakura Trick, Sakura Trap"
    type:  string;  // The type of the anime, can be either TV, OVA, Movie or Special
    episodes:  string;  // The Number of aired episodes
    status:  string;  // The status of the anime (whether it is airing, finished...)
    aired?:  string;  // The date from which the airing started to the one from which it ended, this property will be empty if one of the two dates is unknown
    premiered:  string;  // The date of when the anime has been premiered
    broadcast:  string;  // When the anime is broadcasted
    volumes:  string;  // The Number of volumes of the novel
    chapters:  string;  // The Numbers of chapters of the novel
    published:  string;  // The dates of publications of the novel
    authors:  string;  // The authors of the novel
    serialization:  string;  // The serialization of the novel
    producers:  Array<string>;  // An array of the anime producers
    studios:  Array<string>;  // An array of the anime producers
    source:  string;  // On what the anime is based on (e.g:  based on a manga...)
    genres:  Array<string>;  // An array of the anime genres (Action, Slice of Life...)
    duration:  string;  // Average duration of an episode (or total duration if movie...)
    rating?:  Rating; // The rating of the anime (e.g:  R18+..), see the List of possible ratings
    score:  string;  // The average score
    scoreStats:  string;  // By how many users this anime has been scored, like "scored by 255,693 users"
    ranked:  string;  // The rank of the anime
    popularity:  string;  // The popularity of the anime
    members:  string;  // How many users are members of the anime (have it on their list)
    favorites:  string;  // Count of how many users have this anime as favorite
    id:  Number;  // The unique identifier of the anime
    url:  string;  // the URL to the page
}

interface AnimeSearchResult {
    thumbnail:  string;  // Full url for anime thumbnail
    url:  string;  // Full url for anime page
    video:  string;  // full url of anime trailer video if any
    shortDescription:  string;  // Short description of the anime (or manga)
    title:  string;  // Anime title
    type:  string;  // Anime type
    nbEps:  string;  // Anime Number of episodes
    score:  string;  // Anime score
    startDate:  string;  // Anime start date
    endDate:  string;  // Anime end date
    members:  string;  // Anime Number of members
    rating:  string;  // Anime rating
}

interface Staff {
    link:  string;  // Link to the MAL profile of this person
    picture:  string;  // Link to a picture of the person at the best possible size
    name:  string;  // Their name and surname, like Surname, Name
    role:  string;  // The role this person has/had in this anime (Director, Sound Director...)
}

interface Character {
    link:  string;  // Link to the MAL profile of this character
    picture:  string;  // Link to a picture of the character at the best possible size
    name:  string;  // Their name and surname, like Surname, Name
    role:  string;  // The role this person has/had in this anime (Main, Supporting...)
    seiyuu:  Seiyuu;  // An object containing additional data about who dubbed this character
}

interface Seiyuu {
    link:  string;  // Link to the MAL profile of who dubbed this character
    picture:  string;  // Link to a picture of the seiyuu at the best possible size
    name:  string;  // Their name and surname, like Surname, Name
}

interface SearchResult {
    id:  Number;  // The unique identifier of this result
    type:  string;  // The type of the result (e.g: anime...)
    name:  string;  // The title of the anime
    url:  string;  // The URL to the anime
    image_url:  string;  // URL of the image
    thumbnail_url:  string;  // URL of the thumbnail image
    es_score:  Number;  // A Number representing the accuracy of the result, where 1 is a perfect match and 0 a totally irrelevant one
    payload:  SearchResultPayload;  // An object containing additional data about the anime
}

interface SearchResultPayload {
    media_type:  string;  // The type of the anime, can be either TV, Movie, OVA or Special
    start_year:  Number;  // The year the airing of the anime started
    aired:  string;  // The date from which the airing started to the one from which it ended
    pscore:  string;  // The average score given to this anime
    status:  string;  // The current status of the anime (whether it is still airing, finished...)
}

interface SeasonalRelease {
    TV:  Array<SeasonalAnimeRelease>;  // An array of Seasonal anime release data model objects
    TVNew:  Array<SeasonalAnimeRelease>;  // An array of Seasonal anime release data model objects
    TVCon:  Array<SeasonalAnimeRelease>;  // An array of Seasonal anime release data model objects
    OVAs:  Array<SeasonalAnimeRelease>;  // An array of Seasonal anime release data model objects
    ONAs:  Array<SeasonalAnimeRelease>;  // An array of Seasonal anime release data model objects
    Movies:  Array<SeasonalAnimeRelease>;  // An array of Seasonal anime release data model objects
    Specials:  Array<SeasonalAnimeRelease>;  // An array of Seasonal anime release data model objects
}

interface SeasonalAnimeRelease {
    picture:  string;  // Link to the picture of the anime
    synopsis:  string;  // The synopsis of the anime
    licensor:  string;  // The licensor
    title:  string;  // The name of the anime
    link:  string;  // The direct link to the anime page
    genres:  Array<string>;  // An array of strings which are the genres of this anime
    producers:  Array<string>;  // An array of strings which are the producers of this anime
    fromType:  string;  // From what this anime is based on/an adaptation of (Light novel, manga...)
    nbEp:  string;  // The Number of aired episodes this anime has
    releaseDate:  string;  // When this anime has been released
    score:  string;  // The average score users have given to this anime
}

/** 
Anime ratings can be either:
    G - All Ages
    PG - Children
    PG-13 - Teens 13 or older
    R - 17+ (violence & profanity)
    R+ - Mild Nudity
    Rx - Hentai
*/