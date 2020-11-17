import { entityActions, puzzleActions } from "store/actions";

const COUNT_MOVES_INITIAL = 0;

const STATE_INITIAL = {
    moveCount: COUNT_MOVES_INITIAL,
};

function puzzleReducer(state = STATE_INITIAL, action) {
    const { type } = action;
    const stateClone = { ...state };

    switch (type) {
        case entityActions.move.toString():
            stateClone.moveCount++;
            break;

        case puzzleActions.generate.toString():
            stateClone.moveCount = COUNT_MOVES_INITIAL;
            break;

        default:
            // Do nothing.
            break;
    }

    return stateClone;
}

export { puzzleReducer };
