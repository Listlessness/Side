import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils";

export type {
    EpisodeFullScreenScreenProps
}

type EFSPBaseProps = NativeStackScreenProps<RootStackParamList, 'Episode Full Screen'>;

type EpisodeFullScreenScreenProps = EFSPBaseProps;