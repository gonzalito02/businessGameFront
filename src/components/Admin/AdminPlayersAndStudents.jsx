import React, { useEffect } from "react";
import { checkLog } from "../../redux/actions/actions";
import NavBar from "../NavBar";
import AdminPlayers from "./AdminPlayers/AdminPlayers";
import AdminStudents from "./AdminStudents/AdminStudents";

export default function AdminPlayersAndStudents () {

    useEffect(() => {
        checkLog("admin")  
    }, [])

    return (
        <>  
                <NavBar />
            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
                Players.
            </h2>
                <AdminPlayers />
            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
                Students / Customers
            </h2>
                 <AdminStudents />
        </>
    )

}