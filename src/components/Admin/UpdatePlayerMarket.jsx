import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import {getMarketLive, updateMarketPlayer} from "../../redux/actions/actions"
import { CSVLink } from "react-csv";
import Swal from 'sweetalert2'

export default function UpdatePlayerMarket () {

    const dispatch = useDispatch()
    const market = useSelector(state => state.marketLive)

    useEffect(() => {
        dispatch(getMarketLive())
    }, [])

    const [data, setData] = useState({playerId: "", typeProduct: "", qualityProduct: "", stockProduct: ""})

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const handleClick = () => {
        dispatch(updateMarketPlayer(data))
        swalWithBootstrapButtons.fire({
            text: `Market data updated: ${data.playerId}, product ${data.typeProduct}, quality ${data.qualityProduct}, stock ${data.stockProduct}`,
            timer: 3000
        })
        setData({playerId: "", typeProduct: "", qualityProduct: "", stockProduct: ""})
    }

    const handleChange = (e) => {
        if (e.target.name === "qualityProduct" || e.target.name === "stockProduct") var val = parseInt(e.target.value)
        else var val = e.target.value
        setData({...data, [e.target.name]: val})
    }

    return (
        <>
        <Form>
        <Form.Control name="playerId" value={data.playerId} type="number" onChange={(e) => {handleChange(e)}} placeholder="playerId">
        </Form.Control>
        <Form.Control name="typeProduct" value={data.typeProduct} type="text" onChange={(e) => {handleChange(e)}} placeholder="typeProduct">
        </Form.Control>
        <Form.Control name="qualityProduct" value={data.qualityProduct} type="number" onChange={(e) => {handleChange(e)}} placeholder="qualityProduct">
        </Form.Control>
        <Form.Control name="stockProduct" value={data.stockProduct} type="number" onChange={(e) => {handleChange(e)}} placeholder="stockProduct">
        </Form.Control>
        <Button onClick={(e) => handleClick()}>
            Update Market Values
        </Button>
        <CSVLink data={market}><Button>Download Market CSV</Button></CSVLink>
        </Form>
        </>
    )
}