import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SideStreamWrapperContextProps } from "../../utils";

export type {
    AnimeDetailsScreenProps,
    AnimeDetailsScreenState,
    AnimeDetailsScreenBaseProps
}

type AnimeDetailsScreenBaseProps = NativeStackScreenProps<RootStackParamList, "Anime Details"> ;

type AnimeDetailsScreenProps = AnimeDetailsScreenBaseProps & SideStreamWrapperContextProps;



interface AnimeDetailsScreenState<T> {
    animeDetailsById?: T;
    detailsMessage?: string;
    refreshing: boolean
}