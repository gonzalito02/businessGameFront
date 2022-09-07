import React from "react";
import Container from "react-bootstrap/esm/Container";
import NavBar from "../../NavBar";
import PlayerSalesTable from "./PlayerSalesTable";

export default function PlayerSales () {

    return (
        <>
            <NavBar/>

            <Container>

            <PlayerSalesTable/>

            </Container>
        </>
    )

}