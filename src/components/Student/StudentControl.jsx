import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useSelector, useDispatch } from "react-redux";
import { getStudentById } from "../../redux/actions/actions";
import NavBar from "../NavBar";
import StudentData from "./StudentData";

export default function StudentControl () {

    const dispatch = useDispatch()

    var loginUser = useSelector(state => state.userLogin)

    useEffect(() => {
        if (loginUser.rol === "student") dispatch(getStudentById(loginUser.id))
    }, [dispatch, loginUser])

    return (
        <>
            <NavBar/>

            <Container>

            <StudentData />

            </Container>
        </>
    )

}