import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    AnimeDetailsPageProps,
    AnimeDetailsPageState
}

type AnimeDetailsPageProps = NativeStackScreenProps<RootStackParamList, "Anime Details"> & SideStreamWrapperContextProps;

interface AnimeDetailsPageState<T> {
    animeDetailsById?: T;
    detailsMessage?: string;
    refreshing: boolean
}