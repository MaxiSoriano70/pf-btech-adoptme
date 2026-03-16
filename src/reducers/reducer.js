export const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_MODE":
            return {
                ...state,
                modeDark: !state.modeDark
            };

        default:
            return state;
    }
};