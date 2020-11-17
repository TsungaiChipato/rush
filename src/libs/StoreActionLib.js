export const createActionCreator = (type, payloadCreator) =>{
    const actionCreator = (...payload) => {
        if (typeof payloadCreator === "function") {
            return { type, payload: payloadCreator(...payload) };
        } else {
            return { type };
        }
    };

    actionCreator.toString = () => type;

    return actionCreator;
}
