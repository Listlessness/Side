import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    WatchEpisodeScreenProps,
    WatchEpisodeScreenState,
    WEPBaseProps
}

type WEPBaseProps = NativeStackScreenProps<RootStackParamList, "Watch Episode">;

type WatchEpisodeScreenProps = WEPBaseProps & SideStreamWrapperContextProps;

interface WatchEpisodeScreenState<T, R, V> {
    episodeListMessage?: string,
    currEpisodeMessage?: string,
    episodeList: R[];
    refreshing: boolean;
    currEpisodeInfo?: T;
    currEpisodeSection?: V
}