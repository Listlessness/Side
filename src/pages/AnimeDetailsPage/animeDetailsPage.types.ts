import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils";

export type {
    AnimeDetailsPageProps,
    AnimeDetailsPageState
}

type AnimeDetailsPageProps = NativeStackScreenProps<RootStackParamList, "Anime Details">;

interface AnimeDetailsPageState<T> {
    animeDetailsById?: T
}