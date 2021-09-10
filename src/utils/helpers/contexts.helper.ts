import React from "react";
import { EpisodeThumbnailProps, ThumbnailProps } from "../../components";

/**
 *  Snack Context
*/
interface SnackMessage {
    message: string,
    type?: 'info' | 'default'
}
interface SnackContextType {
    showMessage: ((arg: SnackMessage) => void) | (() => void)
}
const SnackContext = React.createContext<SnackContextType>({showMessage: () => {}});

/**
 *  Bookmarked Anime Context
*/

type BookmarkedAnime = {[index: number]: ThumbnailProps}
interface SSBookmarkedAnimeContextType {
    bookmarkedAnime: BookmarkedAnime,
    updateBookmarks: (newValue: BookmarkedAnime) => void
}

const SSBookmarkedAnimeContext = React.createContext<SSBookmarkedAnimeContextType>({
    bookmarkedAnime: {},
    updateBookmarks: () => {}
});


/**
 *  Last Watched Anime Context
*/

type LastWatchedAnimeItem = EpisodeThumbnailProps & {dateAdded: string, movieId: string}

type LastWatchedAnime = {[index: string]: LastWatchedAnimeItem}
interface SSLastWatchedAnimeContextType {
    lastWatchedAnime: LastWatchedAnime,
    updateLastWatched: (newValue: LastWatchedAnime) => void
}

const SSLastWatchedAnimeContext = React.createContext<SSLastWatchedAnimeContextType>({
    lastWatchedAnime: {},
    updateLastWatched: () => {}
});


/**
 * Context Types
*/

export enum ContextTypeNames {
    SSBookmarkedAnimeContext = "SS-Bookmarked-Anime-Context",
    SnackContext = "Snack-Context",
    SSLastWatchedAnimeContext = "SS-Last-Watched-Anime-Context"
}

SSBookmarkedAnimeContext.displayName = ContextTypeNames.SSBookmarkedAnimeContext;
SnackContext.displayName = ContextTypeNames.SnackContext;
SSLastWatchedAnimeContext.displayName = ContextTypeNames.SSLastWatchedAnimeContext;

interface SideStreamWrapperContextProps {
    snackContext: SnackContextType,
    ssBookmarkedAnimeContext?: SSBookmarkedAnimeContextType,
    OnScreenFocusComp: React.FunctionComponent<{callback: () => any, dependencies?: any[]}>,
    ssLastWatchedAnimeContext: SSLastWatchedAnimeContextType
}


/**
 *  Export Utils
*/

export {
    SnackContext,
    SSBookmarkedAnimeContext,
    SSLastWatchedAnimeContext
};

export type { SideStreamWrapperContextProps, SSBookmarkedAnimeContextType, SnackMessage, BookmarkedAnime, LastWatchedAnime, LastWatchedAnimeItem, SSLastWatchedAnimeContextType };
