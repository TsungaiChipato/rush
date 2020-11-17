import React from "react";

import { Header } from "components";
import { PuzzleCounter } from "components";
import { PuzzleGrid } from "components";
import { PuzzleOptions  } from "components";

export const App = () => {
    return (
        <div>
            <Header />
            <PuzzleCounter />
            <PuzzleGrid />
            <PuzzleOptions />
        </div>
    );
}
