import React from "react";
import { useDispatch } from "react-redux";

import { puzzleActions } from "store/actions";
import { PuzzleTypeEnum } from "objects/enums";


function PuzzleOptions () {

    const dispatch = useDispatch();

    function generatePuzzleBeginner(){
        dispatch(puzzleActions.generate(PuzzleTypeEnum.BEGINNER));
    }

    function generatePuzzleIntermediate () {
        dispatch(puzzleActions.generate(PuzzleTypeEnum.INTERMEDIATE));
    }

    const generatePuzzleRandom = () => {
        dispatch(puzzleActions.generate(PuzzleTypeEnum.RANDOM));
    }

    return (
        <div className="puzzle-options">
            <button onClick={generatePuzzleBeginner}>Beginner</button>
            <button onClick={generatePuzzleIntermediate}>Intermediate</button>
            <button onClick={generatePuzzleRandom}>Generate</button>
        </div>
    );
};

export { PuzzleOptions };
