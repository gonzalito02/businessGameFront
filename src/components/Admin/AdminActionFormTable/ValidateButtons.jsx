import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createResultsData, deleteForm, insertMarketLive, submitUpdate, updateResultsData, validateForm } from "../../../redux/actions/actions";
import Swal from 'sweetalert2'

export default function ValidateButtons ({data}) {

    const dispatch = useDispatch()
    const [stock, setStock] = useState([])
    const gameControl = useSelector(state => state.gameControl)

    const act = gameControl.actionGame
    const tax = gameControl.taxesRate
    const rateControl = gameControl.maxRateFinDinInvest
    const typo = data.type

    useEffect(() => {
        if (data) {
            if (data.type === "actionForm") {
                var stock = []
                if (data.quantityA > 0) stock.push({id: data.playerId, insert: {
                    period: data.period,
                    typeProduct: "A",
                    stockProduct: data.quantityA,
                    qualityProduct: data.qualityA,
                    priceProduct: data.priceA
                    }})
                if (data.quantityB > 0) stock.push({id: data.playerId, insert: {
                    period: data.period,
                    typeProduct: "B",
                    stockProduct: data.quantityB,
                    qualityProduct: data.qualityB,
                    priceProduct: data.priceB
                    }})
                if (data.quantityC > 0) stock.push({id: data.playerId, insert: {
                    period: data.period,
                    typeProduct: "C",
                    stockProduct: data.quantityC,
                    qualityProduct: data.qualityC,
                    priceProduct: data.priceC
                    }})
                setStock(stock)
            }
        }
    }, [dispatch])

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

    const handlePass = (e) => {
        if(data.type === "loan" || data.type === "investment") {var typo = data.type} else {var typo = ""}
        dispatch(validateForm({playerId: data.playerId, period: data.period, validate: 1, type: typo}))
        if(data.type === "actionForm") {
            dispatch(insertMarketLive(stock));  
            dispatch(createResultsData(data.playerId, {
                period: data.period,
                taxesRate: data.taxesRate,
                qualityInvestment: data.qualityInvestment,
                productionInvestment: data.productionInvestment,
                finantialInvestment: data.finantialInvestment,
                finantialFixedInvestment: (data.finantialFixedInvestment)? data.finantialFixedRentability : 0
        }))}
        
        if(data.type === "investment") {
            let finalRate = (data.rate > rateControl)? rateControl : data.rate
            dispatch(updateResultsData(data.playerId,{
                period: data.period,
                finantialInvestmentResults: parseInt((data.amount * (finalRate)))
            }))
        }
        if(data.type === "loan") {
            dispatch(updateResultsData(data.playerId,{
                period: data.clearingPeriod,
                taxesRate: tax,
                loanInterest: parseInt((data.amount * data.rate))
            }))
            console.log("aca")
        }
        dispatch(submitUpdate())
        Toast.fire({
            icon: 'success',
            title: 'Form validated!'
        })
        window.location.reload()
    }

    const handleDenegate = (e) => {
        
        if(data.type === "loan" || data.type === "investment") {var typo = data.type} else {var typo = ""}

        swalWithBootstrapButtons.fire({
            text: "Are you sure?",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(validateForm({playerId: data.playerId, period: data.period, validate: 2, type: typo}))
                if(data.type === "loan") {
                    dispatch(updateResultsData(data.playerId,{
                        period: data.clearingPeriod,
                        taxesRate: tax,
                        loanInterest: parseInt(data.amount)
                    }))
                }
                if(data.type === "actionForm") {
                    dispatch(deleteForm(data.id))
                }
                dispatch(submitUpdate())
                Toast.fire({
                    icon: 'success',
                    title: 'Form denegated'
                })
                window.location.reload()
            } 
        })
    }

    return (
        <>
            <div>
                  {(act === 2 || typo === "actionForm")?<button onClick={e => handlePass(e)}>Validate</button>:null}
                  {(act === 2 || typo === "actionForm")?<button onClick={e => handleDenegate(e)}>Denegate</button>:null}
            </div>
        </>
    )
}