import React, { createContext, useReducer } from "react";
import { loadingReducer } from "../reducers/loadingReducer";

interface ILoadingContext {
    progress: {
        percentLoaded: number;
        loadingDone: boolean;
    };
    dispatch: React.Dispatch<any>;
}

export const LoadingContext = createContext<Partial<ILoadingContext>>({});

export const LoadingContextProvider: React.FC = ({ children }) => {
    const [progress, dispatch] = useReducer(loadingReducer, {
        percentLoaded: 0,
        loadingDone: false,
    });

    return (
        <LoadingContext.Provider value={{ progress, dispatch }}>
            {children}
        </LoadingContext.Provider>
    );
};
