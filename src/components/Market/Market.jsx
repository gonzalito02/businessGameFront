import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useSelector } from "react-redux";
import io from "socket.io-client"
import NavBar from "../NavBar";
import MarketLiveTable from "./MarketLiveTable/MarketLiveTable";

const socket = io.connect("http://localhost:3002")

export default function Market () {

    const loginData = useSelector(state => state.userLogin)

    const sendMessage = () => {
        socket.emit("sendMessage", {message: "hello"})
    }

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            alert(data.message)
        })
    }, [socket])

    return (

        <>

            <NavBar />

            <Container>

                {/* <input></input>
                <button onClick={() => sendMessage()}>Send the message</button> */}
                <MarketLiveTable />

            </Container>

        </>
    )
}