import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Filters, RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    BookmarkedAnimePageProps,
    BookmarkedAnimePageState
}

type LEPBaseProps = NativeStackScreenProps<RootStackParamList, 'Bookmarked Anime'> & SideStreamWrapperContextProps;

interface BookmarkedAnimePageProps<T> extends LEPBaseProps{
    
}

interface BookmarkedAnimePageState<T> {
    messageText: string | undefined,
    items: T[],
    refreshing: boolean,
    fetching: boolean
}