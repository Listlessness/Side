import MMKVStorage, {create} from "react-native-mmkv-storage";
import { bookMarkedStorageKey } from "../constants";

const MMKV = new MMKVStorage.Loader().initialize();

const useStorage = create(MMKV);

const [bookMarkedAnime, updateBookMarks] = useStorage<{[index: (string | number)]: boolean}>(bookMarkedStorageKey);

export const MainSSAppStorage = {
    SSBookMarkedAnime: {
        bookMarkedAnime,
        updateBookMarks
    }
}