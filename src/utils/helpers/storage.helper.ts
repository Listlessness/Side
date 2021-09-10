import MMKVStorage, {create} from "react-native-mmkv-storage";

const MMKV = new MMKVStorage.Loader().initialize();

export const useStorage = create(MMKV);