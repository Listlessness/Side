import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils";

export type {
    WatchEpisodePageProps,
    WatchEpisodePageState
}

type WEPBaseProps = NativeStackScreenProps<RootStackParamList, "Watch Episode">;

interface WatchEpisodePageProps extends WEPBaseProps{

}

interface WatchEpisodePageState<T, R, V> {
    episodeListMessage?: string,
    currEpisodeMessage?: string,
    episodeList: R[];
    refreshing: boolean;
    currEpisodeInfo?: T;
    currEpisodeSection?: V
}