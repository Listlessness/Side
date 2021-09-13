import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Filters, RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    BookmarkedAnimeScreenProps,
    BookmarkedAnimeScreenState
}

type LEPBaseProps = NativeStackScreenProps<RootStackParamList, 'Bookmarked Anime'> & SideStreamWrapperContextProps;

interface BookmarkedAnimeScreenProps<T> extends LEPBaseProps{
    
}

interface BookmarkedAnimeScreenState<T> {
    messageText: string | undefined,
    items: T[],
    refreshing: boolean,
    fetching: boolean
}