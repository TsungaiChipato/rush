import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { determineIfBlockIsFrontOrBackOfEntity, getEntityAtPositionOrNull} from "libs";
import { entityActions } from "store/actions";
import { Car, Truck } from "objects";
import { CarTypeEnum} from "objects/enums";
import { PuzzleWin } from "./PuzzleWin";

const SEPARATOR_SPACE = " ";

const PuzzleBlock = (props) => {
    const classNames = ["puzzle-block"];
    const { block, entityOrNull, isDestination } = props;

    const dispatch = useDispatch();
    const { entities } = useSelector((state) => state.grid);

    const determineIsEntityPlayer = () => {
        if (entityOrNull instanceof Car) {
            return CarTypeEnum.RED.equals(entityOrNull.getType());
        } else {
            return false;
        }
    };

    const isEntityPlayer = determineIsEntityPlayer();

    if (isDestination) {
        classNames.push("puzzle-block-goal");
    } else {

    }

    if (entityOrNull) {
        if (isEntityPlayer) {
            classNames.push("puzzle-block-car-red");
        } else if (entityOrNull instanceof Car) {
            classNames.push("puzzle-block-car");
        } else if (entityOrNull instanceof Truck) {
            classNames.push("puzzle-block-truck");
        } else {

        }
    } else {

    }

    const handleClick = () => {
        if (entityOrNull) {
            const nextPositionOrNull = block.getNextPositionForDirectionOrNull();
            const isClickedBlockFrontOrBackOfEntity = determineIfBlockIsFrontOrBackOfEntity(
                entityOrNull,
                block
            );

            if (nextPositionOrNull && isClickedBlockFrontOrBackOfEntity) {
                const entityAtNextPositionOrNull = getEntityAtPositionOrNull(
                    entities,
                    nextPositionOrNull
                );

                if (entityAtNextPositionOrNull) {
                } else {
                    dispatch(entityActions.move(block));
                }
            } else {

            }
        } else {
        }
    };

    if (isDestination && isEntityPlayer) {
        return <PuzzleWin />
    } else {

        return (
            <div
                onClick={handleClick}
                className={classNames.join(SEPARATOR_SPACE)}
            >
            </div>
        );
    }
};

export { PuzzleBlock };
