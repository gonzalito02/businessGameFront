import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useSelector, useDispatch } from "react-redux";
import { getResultsPlayerById } from "../../../redux/actions/actions";
import NavBar from "../../NavBar";
import PlayerResultsTable from "./PlayerResultsTable";

export default function PlayerResults () {

    const dispatch = useDispatch()

    var loginUser = useSelector(state => state.loginUser)

    useEffect(() => {
        if (loginUser && loginUser.rol === "player") dispatch(getResultsPlayerById(loginUser.id))
    }, [dispatch, loginUser])

    return (
        <>
            <NavBar/>

            <Container>

            <PlayerResultsTable/>

            </Container>
        </>
    )

}