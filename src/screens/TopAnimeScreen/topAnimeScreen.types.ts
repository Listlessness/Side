import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    TopAnimeProps,
    TopAnimeState,
    TAPBaseProps
}

type TAPBaseProps = NativeStackScreenProps<RootStackParamList, 'Top Anime'>;

type TopAnimeProps = TAPBaseProps & SideStreamWrapperContextProps;

interface TopAnimeState<T> {
    currIndex: number,
    currPage: number,
    messageText: string | undefined,
    items: T[],
    refreshing: boolean,
    loadingMore: boolean
}
