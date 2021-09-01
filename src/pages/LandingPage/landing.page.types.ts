import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils";

export type {
    LandingPageProps,
    LandingPageState
}

type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface LandingPageState {
    refreshingCount: number
}