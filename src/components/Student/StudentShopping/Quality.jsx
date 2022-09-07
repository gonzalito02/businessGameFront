import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Quality ({data}) {

    const gameControl = useSelector(state => state.gameControl)

    return (

        <>
            {(gameControl.actionGame !== 1)? <span>{data.qualityProduct}</span> : null}
        </>
    )
}