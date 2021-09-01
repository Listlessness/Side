import React from "react";

export interface SnackMessage {
    message: string,
    type?: 'info' | 'default'
}

interface SnackContextType {
    showMessage: ((arg: SnackMessage) => void) | (() => void)
}

export const SnackContext = React.createContext<SnackContextType>({showMessage: () => {}});