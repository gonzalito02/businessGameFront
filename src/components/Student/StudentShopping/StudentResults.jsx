import React, { useEffect } from "react";
import NavBar from "../../NavBar";
import StudentResultsTable from "./StudentResultsTable";
import Container from "react-bootstrap/esm/Container";

export default function StudentResults () {

    return (
        <>
            <NavBar/>

            <Container>
            
            <StudentResultsTable/>
        
            </Container>

        </>

    )

}