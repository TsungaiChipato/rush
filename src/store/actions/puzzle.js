import { createActionCreator } from "libs";


const generate = createActionCreator(
    "PUZZLE_GENERATE",
    (type) => ({ type })
);

const puzzleActions = {
    generate,
};

export { puzzleActions };
