import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    WatchEpisodeScreenProps,
    WatchEpisodeScreenState
}

type WEPBaseProps = NativeStackScreenProps<RootStackParamList, "Watch Episode"> & SideStreamWrapperContextProps;

interface WatchEpisodeScreenProps extends WEPBaseProps{

}

interface WatchEpisodeScreenState<T, R, V> {
    episodeListMessage?: string,
    currEpisodeMessage?: string,
    episodeList: R[];
    refreshing: boolean;
    currEpisodeInfo?: T;
    currEpisodeSection?: V
}