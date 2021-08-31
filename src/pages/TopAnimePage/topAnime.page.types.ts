import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils";

export type {
    TopAnimeProps,
    TopAnimeState
}

type TAPBaseProps = NativeStackScreenProps<RootStackParamList, 'Top Anime'>;

interface TopAnimeProps<T> extends TAPBaseProps{
    
}

interface TopAnimeState<T> {
    currIndex: number,
    currPage: number,
    messageText: string | undefined,
    items: T[],
    refreshing: boolean,
    loadingMore: boolean
}
