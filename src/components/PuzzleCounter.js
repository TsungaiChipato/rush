import React from "react";
import { useSelector } from "react-redux";

export const PuzzleCounter = () => {
    const { moveCount } = useSelector((state) => state.puzzle);

    return (
        <div className="puzzle-counter">
            <br />
            <h3>{`Moves ${moveCount} `}</h3>
            <br />
        </div>
    );
};
