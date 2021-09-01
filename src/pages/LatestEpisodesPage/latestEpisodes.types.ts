import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils";

export type {
    LatestEpisodeProps,
    LatestEpisodeState
}

type LEPBaseProps = NativeStackScreenProps<RootStackParamList, 'Latest Episodes'>;

interface LatestEpisodeProps<T> extends LEPBaseProps{
    
}

interface LatestEpisodeState<T> {
    currIndex: number,
    currPage: number,
    currPagination: number[],
    messageText: string | undefined,
    items: T[],
    refreshing: boolean,
    loadingMore: boolean
}