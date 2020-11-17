import React from "react";
import { useSelector } from "react-redux";

import { Block, Point } from "objects";
import { PuzzleBlock } from "components";

import {getBlockDestination} from "libs";

export const PuzzleGrid = () => {
    const blockDestination = getBlockDestination();
    const { blocks, entities } = useSelector((state) => state.grid);

    const renderGridColumn = (columns, indexColumn) => {

        const renderGridPuzzleBlock = (_, indexRow) => {

            const getMatchingBlockFromEntityOrDefault = () => {
                const point = new Point(indexColumn, indexRow);
                const block = new Block(point);
                const result = { block };

                for (const entity of entities) {
                    const entityBlockOrUndefined = entity
                        .getBlockPartsFrontToBack()
                        .find((blockPart) => blockPart.equals(block));

                    if (typeof entityBlockOrUndefined === "undefined") {
                    } else {
                        result.entity = entity;
                        result.block = entityBlockOrUndefined;

                        return result;
                    }
                }

                return result;
            };

            const { block, entity } = getMatchingBlockFromEntityOrDefault();

            return (
                <PuzzleBlock
                    block={block}
                    entityOrNull={entity || null}
                    key={block.getPosition().toString()}
                    isDestination={blockDestination.equals(block)}
                />
            );
        };

        return (
            <div key={indexColumn} className={"puzzle-grid-column"}>
                {columns.map(renderGridPuzzleBlock)}
            </div>
        );
    };

    return <div id={"puzzle-grid"}>{blocks.map(renderGridColumn)}</div>;
};
