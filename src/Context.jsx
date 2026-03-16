import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducers/reducer";

const AdoptMeState = createContext();

const stateInitial = {
    pets : [],
    modeDark: false,
}

const Context = ({children}) => {
    const [state, dispatch] = useReducer(reducer, stateInitial);

    return (
        <AdoptMeState.Provider value={{ state, dispatch }}>
            {children}
        </AdoptMeState.Provider>
    );
}

export default Context;

export const useAdoptMeState = () => {
    return useContext(AdoptMeState);
}