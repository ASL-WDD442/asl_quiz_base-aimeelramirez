import React from 'react';
const defaultGlobalState = {
    userId: "",
    loggedIn: false
};
export const GlobalStateContext = React.createContext(defaultGlobalState);
export const DispatchStateContext = React.createContext(undefined);

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        (state, newValue) => ({ ...state, ...newValue }),
        defaultGlobalState
    );
    console.log("Global state provider: ", state)

    return (
        <GlobalStateContext.Provider value={state}>
            <DispatchStateContext.Provider value={dispatch}>
                {children}
            </DispatchStateContext.Provider>
        </GlobalStateContext.Provider>
    );
};