import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/esm/Button";
import Swal from 'sweetalert2'
import { submitUpdate, updateMarketPlayer } from "../../../redux/actions/actions";

export default function UpdateMarketRow (row) {

    const dispatch = useDispatch()
    var submit = useSelector(state => state.submit)

    const [data, setData] = useState({playerId: "", typeProduct: "", qualityProduct: 0, stockProduct: 0})

    useEffect(() => {
        setData({...data, playerId: row.data.playerId, typeProduct: row.data.typeProduct})
    }, [submit])

    console.log(data)
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const handleClick = () => {
        dispatch(updateMarketPlayer(data));
        dispatch(submitUpdate())
        swalWithBootstrapButtons.fire({
            text: `Market data updated: ${data.playerId}, product ${data.typeProduct}, quality ${data.qualityProduct}, stock ${data.stockProduct}`,
            timer: 2500
        })
        setData({...data, qualityProduct: 0, stockProduct: 0})
    }

    const handleChange = (e) => {
        if (e.target.name === "qualityProduct" || e.target.name === "stockProduct") var val = parseInt(e.target.value)
        else var val = e.target.value
        setData({...data, [e.target.name]: val})
    }

    return (
        <>
        <Form>
            <Row>
                <Col>
                <span>Quality</span>
                <Form.Control size="sm" name="qualityProduct" value={data.qualityProduct} type="number" onChange={(e) => {handleChange(e)}} placeholder="qualityProduct">
                </Form.Control>
                </Col>
                <Col> 
                <span>Stock</span>
                <Form.Control size="sm" name="stockProduct" value={data.stockProduct} type="number" onChange={(e) => {handleChange(e)}} placeholder="stockProduct">
                </Form.Control>
                </Col>
                <Col>
                <Button onClick={() => handleClick()}>
                    Update
                </Button>
                </Col>
            </Row>
        </Form>
        </>
    )
}