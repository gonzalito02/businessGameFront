import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import { setWalletAdmin } from "../../../redux/actions/actions";

export default function SetAdminWallet () {

    const dispatch = useDispatch()
    var gameControl = useSelector(state => state.gameControl)
    var [valueWallet, setValueWallet] = useState({value: 0, id: 0})

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
        setValueWallet({...valueWallet, [e.target.name]: parseInt(e.target.value)})
    }

    const handleSubmit = () => {
        dispatch(setWalletAdmin(valueWallet))
        setValueWallet({value: 0, id: 0})
        Toast.fire({
            icon: 'success',
            title: 'Setting up the wallet xd'
        })
    }

    return (

        <>
            <Container>

                <Table>

                <tbody>

                        <tr>
                            <td>
                                Id
                            </td> 
                            <td> 
                                <input name="id" type="number" value={valueWallet.id} onChange={(e) => handleChange(e)}></input> 
                            </td> 

                        </tr>
                        <tr>

                            <td>
                                Value
                            </td> 
                            <td> 
                                <input name="value" type="number" value={valueWallet.value} onChange={(e) => handleChange(e)}></input> 
                            </td> 

                        </tr>
                </tbody>

                </Table>

                <Button onClick={() => handleSubmit()}>Set Wallet</Button>

            </Container>
        </>
    )
} 