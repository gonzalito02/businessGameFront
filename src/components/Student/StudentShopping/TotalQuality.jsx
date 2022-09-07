import React from "react";
import { useSelector } from "react-redux";

export default function TotalQuality ({data}) {

    const gameControl = useSelector(state => state.gameControl)

    return (

        <>
            {(gameControl.actionGame !== 1)? <span>{data.totalQuality}</span> : null}
        </>
    )
}