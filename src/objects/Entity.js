import { Block } from "objects";
import { getLastFromArray } from "libs";

class Entity {

    constructor(entityStartBlock, lengthInBlocks) {
        this.length = lengthInBlocks;
        this.entityPartsFrontToBack = [entityStartBlock];
        this.direction = entityStartBlock.getDirectionOrNull();

        const determineNextBlockFromBlockForDirection = (isLastPart) => {
            const startBlockDirectionOrNull = entityStartBlock.getDirectionOrNull();

            const growthDirection = Block.reverseDirection(
                startBlockDirectionOrNull
            );

            const previousBlock = getLastFromArray(
                this.entityPartsFrontToBack
            );

            const nextPositionOrNull = previousBlock.getNextPositionForDirectionOrNull(
                growthDirection
            );

            const determineBlockDirectionOrNull = () => {
                if (isLastPart) {
                    return growthDirection;
                } else {
                    return this.direction;
                }
            };

            if (nextPositionOrNull) {
                return new Block(
                    nextPositionOrNull,
                    determineBlockDirectionOrNull()
                );
            } else {

            }
        };

        for (let index = 0; index < lengthInBlocks - 1; index++) {
            const isLastPart = index === lengthInBlocks - 2;
            const block = determineNextBlockFromBlockForDirection(isLastPart);

            this.entityPartsFrontToBack.push(block);
        }
    }

    getBlockPartsFrontToBack() {
        return this.entityPartsFrontToBack;
    }

    move(options) {
        const determineDirectionOrNull = () => {
            const firstPart = this.entityPartsFrontToBack[0];
            const directionOrNull = firstPart.getDirectionOrNull();

            if (options.isForward) {
                return directionOrNull;
            } else {
                return Block.reverseDirection(directionOrNull);
            }
        };

        const mapPartBlock = (partBlock) => {
            const direction = determineDirectionOrNull();
            const positionNextOrNull = partBlock.getNextPositionForDirectionOrNull(
                direction
            );

            return partBlock.setPosition(positionNextOrNull);
        };

        this.entityPartsFrontToBack = this.entityPartsFrontToBack.map(
            mapPartBlock
        );
    }
}

export { Entity };
