import { createActionCreator } from "libs";

const move = createActionCreator(
    "ENTITY_MOVE",
    (block) => ({ block })
);

const entityActions = {
    move,
};

export { entityActions };
