import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    LatestEpisodeProps,
    LatestEpisodeState,
    LEPBaseProps
}

type LEPBaseProps = NativeStackScreenProps<RootStackParamList, 'Latest Episodes'> & SideStreamWrapperContextProps;

type LatestEpisodeProps = LEPBaseProps & SideStreamWrapperContextProps;

interface LatestEpisodeState<T> {
    currIndex: number,
    currPage: number,
    currPagination: number[],
    messageText: string | undefined,
    items: T[],
    refreshing: boolean,
    loadingMore: boolean
}