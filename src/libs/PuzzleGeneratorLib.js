import { DirectionEnum, PuzzleTypeEnum } from "objects/enums";
import { CarTypeEnum } from "objects/enums";
import { Car, Point, Block, Truck } from "objects";
import {
    getBlocksInMatrix,
    randomBetween,
    getEntityPlacementOptionsForBlocks,
    empty,
    addAll,
    getRandom,
    createNewCarRed,
    createNewCarObstacle,
    createNewTruck
     } from "libs";



export const generate = (puzzleType) => {
    const entities = _generatePuzzleByPuzzleType(puzzleType);
    _assertEntitiesDoNotOverlap(entities);
    _assertEntitiesHaveValidCarTypeRed(entities);
    return entities;
}

export const createTruck = (x, y, direction) =>{
    const point = new Point(x, y);
    const block = new Block(point, direction);

    return new Truck(block);
}

export const createCarRed = (x, y, direction) => {
    return _createCar(x, y, direction, CarTypeEnum.RED);
}


export const createCarObstacle = (x, y, direction) => {
    return _createCar(x, y, direction, CarTypeEnum.OBSTACLE);
}

export const _createCar = (x, y, direction, type) =>{
    const point = new Point(x, y);
    const block = new Block(point, direction);

    return new Car(block, type);
}

export const _generatePuzzleByPuzzleType = (puzzleType) =>{
    if (PuzzleTypeEnum.BEGINNER.equals(puzzleType)) {
        return _generateBeginner();
    } else if (PuzzleTypeEnum.INTERMEDIATE.equals(puzzleType)) {
        return _generateIntermediate();
    } else if (PuzzleTypeEnum.RANDOM.equals(puzzleType)) {
        return _generateRandom();
    } else {

    }
}

export const _generateBeginner = () => {
    return [
        createCarObstacle(0, 1, DirectionEnum.RIGHT),
        createTruck(0, 5, DirectionEnum.UP),
        createTruck(3, 0, DirectionEnum.DOWN),
        createTruck(3, 3, DirectionEnum.DOWN),
        createCarRed(2, 2, DirectionEnum.RIGHT),
        createCarObstacle(4, 0, DirectionEnum.UP),
        createCarObstacle(4, 4, DirectionEnum.LEFT),
        createTruck(5, 4, DirectionEnum.RIGHT),
    ];
}

export const _generateIntermediate = () => {
    return [
        createCarObstacle(0, 2, DirectionEnum.RIGHT),
        createCarObstacle(0, 3, DirectionEnum.LEFT),
        createCarObstacle(1, 1, DirectionEnum.RIGHT),
        createCarObstacle(1, 2, DirectionEnum.LEFT),
        createTruck(1, 4, DirectionEnum.UP),
        createTruck(3, 5, DirectionEnum.DOWN),
        createTruck(2, 0, DirectionEnum.UP),
        createTruck(4, 1, DirectionEnum.DOWN),
        createCarRed(2, 3, DirectionEnum.RIGHT),
        createCarObstacle(3, 2, DirectionEnum.UP),
        createCarObstacle(3, 3, DirectionEnum.UP),
        createCarObstacle(4, 5, DirectionEnum.RIGHT),
        createCarObstacle(5, 2, DirectionEnum.RIGHT),
        createCarObstacle(5, 3, DirectionEnum.LEFT),
    ];
}


const _generateRandom = () => {
    const availableBlocks = getBlocksInMatrix();
    const blockKeepEmptyCount = randomBetween(
        4,
        16
    );
    const entityPlacementOptions = getEntityPlacementOptionsForBlocks(
        availableBlocks
    );

    const placeEntityInAvailableBlocks = (entity) => {
        entity.getBlockPartsFrontToBack().forEach((partBlock) => {
            const index = availableBlocks.findIndex((availableBlock) => {
                return availableBlock.equals(partBlock);
            });

            if (index === -1) {

            } else {
                availableBlocks.splice(index, 1);
            }
        });

        const updatedEntityPlacementOptions = getEntityPlacementOptionsForBlocks(
            availableBlocks
        );

        empty(entityPlacementOptions);
        addAll(
            updatedEntityPlacementOptions,
            entityPlacementOptions
        );

        return entity;
    };


    const createRandomlyPlacedCarRed = () => {
        return placeEntityInAvailableBlocks(
            createNewCarRed(
                2,
                randomBetween(
                    1,
                    4
                ),
                DirectionEnum.RIGHT
            )
        );
    };


    const createRandomlyPlacedObstacleForPlacementOptions = (
        placementOptions
    ) => {
        const { block, availableDirections } = getRandom(
            placementOptions
        );

        const availableDirectionsToEntityOptions = () => {
            return Object.entries(availableDirections).reduce(
                (
                    availableDirectionsByEntity,
                    [direction, availableBlockCount]
                ) => {
                    const entitiesThatFit = [];

                    if (availableBlockCount >= Car.getLength() - 1) {
                        entitiesThatFit.push(Car);
                    } else {

                    }

                    if (availableBlockCount >= Truck.getLength() - 1) {
                        entitiesThatFit.push(Truck);
                    } else {

                    }

                    if (entitiesThatFit.length > 0) {
                        return [
                            ...availableDirectionsByEntity,
                            { [direction]: entitiesThatFit },
                        ];
                    } else {
                        return availableDirectionsByEntity;
                    }
                },
                []
            );
        };

        const startPosition = block.getPosition();
        const directions = availableDirectionsToEntityOptions();

        const [
            randomDirection,
            randomDirectionEntityOptions,
        ] = Object.entries(getRandom(directions))[0];

        const RandomEntity = getRandom(
            randomDirectionEntityOptions
        );

        const directionEntry = DirectionEnum.getEntryByValueOrNull(
            randomDirection
        );

        if (RandomEntity === Car) {
            return createNewCarObstacle(
                startPosition.getX(),
                startPosition.getY(),
                Block.reverseDirection(directionEntry)
            );
        } else if (RandomEntity === Truck) {
            return createNewTruck(
                startPosition.getX(),
                startPosition.getY(),
                Block.reverseDirection(directionEntry)
            );
        } else {

        }
    };

    const createRandomlyPlacedObstaclesForRemainingAvailableSpace = () => {
        const output = [];

        do {
            output.push(
                placeEntityInAvailableBlocks(
                    createRandomlyPlacedObstacleForPlacementOptions(
                        entityPlacementOptions
                    )
                )
            );
        } while (
            entityPlacementOptions.length &&
            availableBlocks.length > blockKeepEmptyCount
        );

        return output;
    };

    return [
        createRandomlyPlacedCarRed(),
        ...createRandomlyPlacedObstaclesForRemainingAvailableSpace(),
    ];
}

const _assertEntitiesDoNotOverlap = (entities) => {
    entities.reduce((occupiedBlocks, entity, index) => {
        entity.getBlockPartsFrontToBack().forEach((entityPartBlock) => {
        });

        return occupiedBlocks;
    }, []);
}

const _assertEntitiesHaveValidCarTypeRed = (entities) => {
    const entityCarRedCount = entities.reduce((count, entity) => {
        if (entity instanceof Car) {
            if (CarTypeEnum.RED.equals(entity.getType())) {
                return count + 1;
            } else {
                return count;
            }
        } else {
            return count;
        }
    }, 0);

    if (entityCarRedCount > 1) {

    } else if (entityCarRedCount < 1) {

    } else {

    }
}
