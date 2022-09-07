import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartControlFunc, getMarketLive, makeCart } from "../../../redux/actions/actions";

export default function ShoppingSet ({data}) {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const student = useSelector(state => state.dataStudentId)

    var [errors, setErrors] = useState({valid: ""})

    const cartFill = () => {
        if (cart.length > 0) {
            var finalCart = {}
            for (let i = 0; i < cart.length; i++) {
                let obj = {
                    "id": cart[i][2].playerId,
                    "purchase":{   
                                "period": cart[i][2].period,
                                "typeProduct": cart[i][2].typeProduct,
                                "purchase": cart[i][1]
                                }
                            }
                finalCart = {...finalCart, [i]:obj}
            }
        }
        return finalCart
    }

    useEffect(() => {
        dispatch(getMarketLive())
        cartFill()
    }, [])

    const handlePurchase = (e) => {
        e.preventDefault()
        const prod = e.target.name
        var val = document.getElementById(e.target.name).value
        if (data.stockProduct < val) {
            setErrors({valid:"Error, no hay suficiente stock"})
            dispatch(cartControlFunc(prod, "add"))
        }
        else {
            setErrors({valid:""})
            dispatch(makeCart([prod, val, data]))
            dispatch(cartControlFunc(prod, "rm"))
        }
    }

    return (

        <>
            {(data.playerId === student.playerId || data.stockProduct === 0)?
            <span>You cant buy this product or there are no stock</span>
            :
            <input name={
                    (data.typeProduct === "A")? `${data.playerId}1`: 
                    (data.typeProduct === "B")? `${data.playerId}2`:
                    `${data.playerId}3`} 
                onChange={e => handlePurchase(e)} id={
                    (data.typeProduct === "A")? `${data.playerId}1`: 
                    (data.typeProduct === "B")? `${data.playerId}2`:
                    `${data.playerId}3`} 
            ></input>
            }
            {errors.valid? <span>{errors.valid}</span> : null}
        </>
    )
}