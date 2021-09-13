import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils";

export type {
    EpisodeFullScreenProps
}

type EFSPBaseProps = NativeStackScreenProps<RootStackParamList, 'Episode Full Screen'>;

type EpisodeFullScreenProps = EFSPBaseProps;