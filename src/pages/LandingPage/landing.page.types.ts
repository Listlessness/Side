import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils";

export type {
    LandingPageProps
}

type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'Home'>;