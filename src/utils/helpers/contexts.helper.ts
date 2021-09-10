import React from "react";
import { ThumbnailProps } from "../../components";

interface SnackMessage {
    message: string,
    type?: 'info' | 'default'
}
interface SnackContextType {
    showMessage: ((arg: SnackMessage) => void) | (() => void)
}
const SnackContext = React.createContext<SnackContextType>({showMessage: () => {}});

type BookmarkedAnime = {[index: number]: ThumbnailProps}
interface SSBookmarkedAnimeContextType {
    bookmarkedAnime: BookmarkedAnime,
    updateBookmarks: (newValue: BookmarkedAnime) => void
}

const SSBookmarkedAnimeContext = React.createContext<SSBookmarkedAnimeContextType>({
    bookmarkedAnime: {},
    updateBookmarks: () => {}
});

export enum ContextTypeNames {
    SSBookmarkedAnimeContext = "SS-Bookmarked-Anime-Context",
    SnackContext = "Snack-Context"
}

SSBookmarkedAnimeContext.displayName = ContextTypeNames.SSBookmarkedAnimeContext;
SnackContext.displayName = ContextTypeNames.SnackContext


interface SideStreamWrapperContextProps {
    snackContext: SnackContextType,
    ssBookmarkedAnimeContext?: SSBookmarkedAnimeContextType,
    OnScreenFocusComp: React.FunctionComponent<{callback: () => any, dependencies?: any[]}>
}

export {
    SnackContext,
    SSBookmarkedAnimeContext
};

export type { SideStreamWrapperContextProps, SSBookmarkedAnimeContextType, SnackMessage, BookmarkedAnime };
