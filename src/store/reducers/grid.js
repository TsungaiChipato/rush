import { Point, Block } from "objects";
import { PuzzleTypeEnum } from "objects/enums";
import { getMatrix, getEntityAtBlockOrNull, generate } from "libs";
import { entityActions, puzzleActions } from "store/actions";


function generateBlockMatrix() {
    return getMatrix().reduce((blockMatrix, rows, y) => {
        return [
            ...blockMatrix,
            rows.map((row, x) => new Block(new Point(x, y))),
        ];
    }, []);
}

function createInitialState() {
    return {
        blocks: generateBlockMatrix(),
        entities: generate(PuzzleTypeEnum.BEGINNER),
    };
}

function gridReducer(state = createInitialState(), action) {
    const stateClone = { ...state };
    const { type, payload } = action;

    switch (type) {
        case entityActions.move.toString():
            const { block: blockClicked } = payload;
            const targetEntityOrNull = getEntityAtBlockOrNull(
                stateClone.entities,
                blockClicked
            );

            if (targetEntityOrNull) {
                const isBlockFrontOfEntity = blockClicked.equals(
                    targetEntityOrNull.getBlockPartsFrontToBack()[0]
                );

                targetEntityOrNull.move({
                    isForward: isBlockFrontOfEntity,
                });
            } else {
                //throw new Error("Moved an entity... but it doesn't exist?");
            }
            break;

        case puzzleActions.generate.toString():
            stateClone.entities = generate(payload.type);
            break;

        default:
            break;
    }

    return stateClone;
}

export { gridReducer };
