import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    AnimeDetailsScreenProps,
    AnimeDetailsScreenState
}

type AnimeDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "Anime Details"> & SideStreamWrapperContextProps;

interface AnimeDetailsScreenState<T> {
    animeDetailsById?: T;
    detailsMessage?: string;
    refreshing: boolean
}