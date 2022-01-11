export const loadingReducer = (state: any, action: any) => {
    switch (action.type) {
        case "ON_PROGRESS":
            return {
                ...state,
                percentLoaded: action.percentLoaded,
            };

        case "LOADING_COMPLETE":
            return {
                ...state,
                loadingDone: true,
            };

        default:
            return state;
    }
};
