import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useSelector, useDispatch } from "react-redux";
import { getFormById, getGameControl } from "../../redux/actions/actions";
import NavBar from "../NavBar";
import ActionFormTable from "./ActionFormTable/ActionFormTable";
import FormActionCreate from "./FormActionCreate";
import PlayerData from "./PlayerData";

export default function PlayerControl () {

    const dispatch = useDispatch()

    var loginUser = useSelector(state => state.userLogin)

    const idt = loginUser.id 

    useEffect(() => {
        if (loginUser.rol === "player") dispatch(getFormById(idt))
        if (!idt && loginUser.rol === "player") dispatch(getFormById(idt));
    }, [dispatch, loginUser, idt])


    return (
        <>
            <NavBar/>

            <Container>

            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>Player Data</h2>

            <PlayerData playerID={idt}/>

            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>Submitted Action forms</h2>

            <ActionFormTable />

            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>Action and Dinamic Forms</h2>

            <FormActionCreate />
        

            </Container>
        </>
    )

}