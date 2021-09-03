import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils";

export type {
    EpisodeFullScreenPageProps
}

type EFSPBaseProps = NativeStackScreenProps<RootStackParamList, 'Episode Full Screen'>;

interface EpisodeFullScreenPageProps extends EFSPBaseProps{
    
}