import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { destroyMarketLive, setWallet } from "../../../redux/actions/actions";
import Swal from 'sweetalert2'
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SetWallet () {

    const dispatch = useDispatch()
    var gameControl = useSelector(state => state.gameControl)
    var [valueWallet, setValueWallet] = useState({value: 0})

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const handleChange = (e) => {
        setValueWallet({value: e.target.value})
    }

    const handleSubmit = () => {
        dispatch(setWallet(valueWallet))
        setValueWallet({value: 0})
        Toast.fire({
            icon: 'success',
            title: 'Setting up the wallet'
        })
    }

    const handleDestroy = () => {
        swalWithBootstrapButtons.fire({
            text: "Are you sure you want to destroy the market?",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(destroyMarketLive()) 
                Toast.fire({
                    icon: 'success',
                    title: 'Destroying the market'
                })
            } 
            setTimeout(()=> window.location.reload(), 1500)
          })
    }

    return (

        <>
            <Container>
                <Row>
                    <Col>
                        <Button onClick={(e) => handleSubmit()}>Set Wallet</Button>
                        <span>{" "}</span>
                        <input value={valueWallet.value} type="number" onChange={(e) => handleChange(e)}></input>
                        <span>  Indicar el valor de la billetera</span>
                    </Col>
                    <Col>
                        <Button disabled={gameControl.actionGame !== 2} onClick={(e) => handleDestroy()}>Destroy market</Button>
                        <span>  Se destruiran todos los registros del mercado actual</span>
                    </Col>
                </Row>
            </Container>
        </>
    )
} 