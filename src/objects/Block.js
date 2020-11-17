import { Point } from "objects";
import { getLastIndexArray, getMatrix } from "libs";
import { DirectionEnum } from "objects/enums";

class Block {

    constructor(position, directionOrNull = null) {
        this.position = position;
        this.directionOrNull = directionOrNull;
    }

    setPosition(position) {
        this.position = position;

        return this;
    }

    getDirectionOrNull() {
        return this.directionOrNull;
    }

    getPosition() {
        return this.position;
    }

    getNextPositionForDirectionOrNull(
        directionOverrideOrNull = null,
        positionOverrideOrNull = null
    ) {
        const position = positionOverrideOrNull || this.position;
        const directionOrNull = directionOverrideOrNull || this.directionOrNull;

        if (directionOrNull) {
            const matrix = getMatrix();
            const nextPositionOrNull = Point.getNextPositionInDirectionForPointOrNull(
                position,
                directionOrNull
            );

            if (nextPositionOrNull) {
                if (nextPositionOrNull.hasNegativeCoordinates()) {
                    return null;
                } else if (
                    nextPositionOrNull.getX() > getLastIndexArray(matrix)
                ) {
                    return null;
                } else if (
                    nextPositionOrNull.getY() > getLastIndexArray(matrix[0])
                ) {
                    return null;
                } else {
                    return nextPositionOrNull;
                }
            } else {
                return null;
            }
        }
    }

    equals(block) {
        return this.position.equals(block.getPosition());
    }

    static reverseDirection(direction) {
        if (DirectionEnum.UP.equals(direction)) {
            return DirectionEnum.DOWN;
        } else if (DirectionEnum.RIGHT.equals(direction)) {
            return DirectionEnum.LEFT;
        } else if (DirectionEnum.DOWN.equals(direction)) {
            return DirectionEnum.UP;
        } else if (DirectionEnum.LEFT.equals(direction)) {
            return DirectionEnum.RIGHT;
        }
    }
}

export { Block };
