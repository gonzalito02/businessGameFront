import React, { useEffect } from "react";
import { checkLog } from "../../redux/actions/actions";
import NavBar from "../NavBar";
import AdminPlayerCreate from "./AdminCreate/AdminPlayerCreate";
import AdminStudentCreate from "./AdminCreate/AdminStudentCreate";

export default function AdminCreate () {

    useEffect(() => {
        checkLog("admin")  
    }, [])

    return (
        <>
            <NavBar />
        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
            Player Create
        </h2>
            <AdminPlayerCreate />
        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
            Student Create
        </h2>
            <AdminStudentCreate />
        </>
    )

}