import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkLog, getAllForms, getAllPlayers, getGameControl } from "../../redux/actions/actions";
import NavBar from "../NavBar";
import AdminActionFormTable from "./AdminActionFormTable/AdminActionFormTable";
import AdminActionFormTableValidated from "./AdminActionFormTableValidated/AdminActionFormTableValidated";
import GameControl from "./GameControl";
import UpdatePlayerMarket from "./UpdatePlayerMarket";

export default function AdminControl () {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllForms())
        dispatch(getAllPlayers())
        checkLog("admin")  
    }, [dispatch])

    return (
        <>
            <NavBar />
        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
            Game Control
        </h2 >
            <GameControl />

        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
            Submitted Forms.
        </h2>
            <AdminActionFormTable />
        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
            Controlled Forms
        </h2>
            <AdminActionFormTableValidated />
        </>
    )

}