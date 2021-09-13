import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Filters, RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    BookmarkedAnimeScreenProps,
    BookmarkedAnimeScreenState,
    BABaseProps
}

type BABaseProps = NativeStackScreenProps<RootStackParamList, 'Bookmarked Anime'>;

type BookmarkedAnimeScreenProps = BABaseProps & SideStreamWrapperContextProps;

interface BookmarkedAnimeScreenState<T> {
    messageText: string | undefined,
    items: T[],
    refreshing: boolean,
    fetching: boolean
}