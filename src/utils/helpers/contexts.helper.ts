import React from "react";
import { MainSSAppStorage } from "./storage.helper";

export interface SnackMessage {
    message: string,
    type?: 'info' | 'default'
}
interface SnackContextType {
    showMessage: ((arg: SnackMessage) => void) | (() => void)
}
const SnackContext = React.createContext<SnackContextType>({showMessage: () => {}});

type SSAppStorageContextType = typeof MainSSAppStorage;

const SSAppStorageContext = React.createContext<SSAppStorageContextType>({
    SSBookMarkedAnime: {
        bookMarkedAnime: {},
        updateBookMarks: () => {}
    }
});

export {
    SnackContext,
    SSAppStorageContext
}