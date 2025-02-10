import { createContext } from 'react';

export const AppContext = createContext<{
    appEnv?: string;
    isFeedbackDisplayed: boolean;
    setIsFeedbackDisplayed: (isFeedbackDisplayed: boolean) => void;
}>({
    appEnv: undefined,
    isFeedbackDisplayed: false,
    setIsFeedbackDisplayed: (isFeedbackDisplayed: boolean) => { },
});
