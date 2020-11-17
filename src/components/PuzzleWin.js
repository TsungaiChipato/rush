import React from "react";
import { useSelector } from "react-redux";

import swal from 'sweetalert'

function PuzzleWin() {
    const { moveCount } = useSelector((state) => state.puzzle);

    return(
        <div>
            {
                swal({
                    title: "Good job!",
                    text: `You Won, in ${moveCount} moves!`,
                    icon: "success"}
                    ).then(
                        function() {
                            window.location.reload();
                        }
                )
            }

        </div>
  )
}

export { PuzzleWin };
