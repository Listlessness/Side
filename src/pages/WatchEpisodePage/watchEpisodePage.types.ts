import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils";

export type {
    WatchEpisodePageProps,
    WatchEpisodePageState
}

type WEPBaseProps = NativeStackScreenProps<RootStackParamList, "Watch Episode">;

interface WatchEpisodePageProps extends WEPBaseProps{

}

interface WatchEpisodePageState<T, R> {
    currEpisodeId: string;
    episodeListMessage?: string,
    currEpisodeMessage?: string,
    episodeList: T[];
    refreshing: boolean;
    currEpisodeInfo?: R
}