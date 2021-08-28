import { RootStackParamList } from '../constants/routes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export const UseNavigation = () => useNavigation<StackNavigationProp<RootStackParamList>>();