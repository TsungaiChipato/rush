import { createStore, combineReducers } from "redux";

import { gridReducer, puzzleReducer } from "store/reducers";


function getReducersCombined() {
    return combineReducers({
        grid: gridReducer,
        puzzle: puzzleReducer,
    });
}

const store = createStore(
    getReducersCombined(),
);

export { store };
