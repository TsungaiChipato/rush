import { Block, Point } from "objects";
import { DirectionEnum } from "objects/enums";

export const getMatrix = () => {
    return Array(6).fill(Array(6).fill(0));
}

export const getBlockDestination = () => {
    const point = new Point(
        2,
        5
    );

    return new Block(point);
}
export const getBlocksInMatrix = () => {
    return getMatrix().reduce((buffer, rows, x) => {
        return [
            ...buffer,
            ...rows.map((_, y) => new Block(new Point(x, y))),
        ];
    }, []);
}

export const getEntityAtBlockOrNull = (entities, block) => {
    const entity = entities.find((entity) => {
        return entity.getBlockPartsFrontToBack().some((entityPartBlock) => {
            return entityPartBlock.equals(block);
        });
    });

    return entity || null;
}

export const getEntityAtPositionOrNull = (entities, position) => {
    const entity = entities.find((entity) => {
        return entity.getBlockPartsFrontToBack().some((entityPartBlock) => {
            return entityPartBlock.getPosition().equals(position);
        });
    });

    return entity || null;
}

export const getLastFrom = (array) => {
    return array[getLastIndex(array)];
}

export const getLastIndex = (array) =>{
    return array.length - 1;
}

export const determineIfBlockIsFrontOrBackOfEntity = (entity, block) => {
    const partBlocksFrontToBack = entity.getBlockPartsFrontToBack();

    if (partBlocksFrontToBack[0].equals(block)) {
        return true;
    } else if (getLastFrom(partBlocksFrontToBack).equals(block)) {
        return true;
    } else {
        return false;
    }
}

export const getFreeBlockCountForEveryDirectionForBlock = (availableBlocks, block) => {
    const blockFreeCountByDirection = {};
    const blockPosition = block.getPosition();

    const isPositionAvailable = (position) => {
        if (position) {
            return availableBlocks.some((availableBlock) => {
                return availableBlock.getPosition().equals(position);
            });
        } else {
            return false;
        }
    };

    const getCountOfAvailableNextBlockForDirection = (
        direction,
        previousPosition
    ) => {

        const getNextPositionOrNull = (previousPosition) => {
            return block.getNextPositionForDirectionOrNull(
                direction,
                previousPosition
            );
        };

        let counter = 0;
        let nextPositionOrNull = getNextPositionOrNull(previousPosition);

        while (isPositionAvailable(nextPositionOrNull)) {
            counter++;
            nextPositionOrNull = getNextPositionOrNull(nextPositionOrNull);
        }

        return counter;
    };

    const blockCountUp = getCountOfAvailableNextBlockForDirection(
        DirectionEnum.UP,
        blockPosition
    );

    const blockCountRight = getCountOfAvailableNextBlockForDirection(
        DirectionEnum.RIGHT,
        block.getPosition()
    );

    const blockCountDown = getCountOfAvailableNextBlockForDirection(
        DirectionEnum.DOWN,
        blockPosition
    );

    const blockCountLeft = getCountOfAvailableNextBlockForDirection(
        DirectionEnum.LEFT,
        blockPosition
    );

    if (blockCountUp) {
        blockFreeCountByDirection[
            DirectionEnum.UP.getValue()
        ] = blockCountUp;
    }

    if (blockCountRight) {
        blockFreeCountByDirection[
            DirectionEnum.RIGHT.getValue()
        ] = blockCountRight;
    }

    if (blockCountDown) {
        blockFreeCountByDirection[
            DirectionEnum.DOWN.getValue()
        ] = blockCountDown;
    }

    if (blockCountLeft) {
        blockFreeCountByDirection[
            DirectionEnum.LEFT.getValue()
        ] = blockCountLeft;
    }

    return blockFreeCountByDirection;
}

export const getEntityPlacementOptionsForBlocks = (availableBlocks) => {

    const reducer = (availablePlacementOptions, availableBlock) => {
        const freeBlocksByDirection = getFreeBlockCountForEveryDirectionForBlock(
            availableBlocks,
            availableBlock
        );

        const freeDirections = Object.entries(freeBlocksByDirection).filter(
            (value) => Object.values(value).length > 0
        );

        if (freeDirections.length > 0) {
            return [
                ...availablePlacementOptions,
                {
                    block: availableBlock,
                    availableDirections: Object.fromEntries(freeDirections),
                },
            ];
        } else {
            return availablePlacementOptions;
        }
    };

    return availableBlocks.reduce(reducer, []);
}
