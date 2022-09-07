import React, { useEffect } from "react";
import { checkLog } from "../../redux/actions/actions";
import NavBar from "../NavBar";
import AllPlayersResultsTable from "./PlayersResults/AllPlayersResultsTable";

export default function AdminPlayersResults () {

    useEffect(() => {
        checkLog("admin")  
    }, [])

    return (
        <>  
                <NavBar />
            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
                Players Results.
            </h2>
                <AllPlayersResultsTable />
            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
                Actions Plans.
            </h2>
        </>
    )

}