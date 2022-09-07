import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { useSelector, useDispatch } from "react-redux";
import { createActionForm, getPlayerById, getQualityRegisterById, parseCurrency, submitUpdate } from "../../redux/actions/actions";
import Swal from 'sweetalert2'


export default function FormActionCreate () {

    const dispatch = useDispatch()
    var gameControl = useSelector(state => state.gameControl)
    var loginData = useSelector(state => state.userLogin)
    var dataPlayer = useSelector(state => state.dataPlayerId)
    var qualityRegister = useSelector(state => state.qualityRegister)
    const [netLoan, setNetLoan] = useState(0)

    const allowed = dataPlayer.allowToPlay

    var { initialCapital } = dataPlayer

    const {
        period,
        taxesRate,
        qualityInvCost,
        productionCapacity,
        costProdA,
        costProdB,
        costProdC,
        minProductCapacity,
        minRateLoan,
        maxLoanAmount,
        maxRateFinDinInvest,
        maxRateFinFixedInvest,
        maxTotalFinInvestAmount
    } = gameControl

    if (qualityRegister) {
        var resq = qualityRegister.filter(q => q.period < (period))
        
        function SortArray(x, y){
            if (x.period > y.period) {return -1;}
            if (x.period < y.period) {return 1;}
            return 0;
        }
        var sorted = resq.sort(SortArray);

        if (sorted.length > 0) {
            var initQualityA = sorted[0].qualityA
            var initQualityB = sorted[0].qualityB
            var initQualityC = sorted[0].qualityC
        } else {
            var initQualityA = costProdA / 1000
            var initQualityB = costProdB / 1000
            var initQualityC = costProdC / 1000
        }
    }

    const [errors, setErrors] = useState({
        integer:"",
        general: "",
        dinform: "",
        total:""
    })

    const [form, setForm] = useState({
        period: gameControl.period,
        taxesRate: gameControl.taxesRate,
        priceA: 0, 
        qualityA: 0,
        quantityA: 0,
        priceB: 0, 
        qualityB: 0,
        quantityB: 0,
        priceC: 0, 
        qualityC: 0,
        quantityC: 0,
        finantialFixedInvestment: 0,
        finantialFixedRentability: 0
    })
    
    const [investmentForm, setInvestmentForm] = useState({
        period: gameControl.period,
        type: "investment",
        amount: 0,
        rate: 0,
        description: "",
    })

    var [loanForm, setLoanForm] = useState({
        period: gameControl.period,
        type: "loan",
        amount: 0,
        rate: 0,
        description: "",
        clearingPeriod: (gameControl.period + 1)
    })

    useEffect(() => {
        if (gameControl) {
            if (gameControl.period) {
                setInvestmentForm({...investmentForm, period: gameControl.period}); 
                setLoanForm({...loanForm, period: gameControl.period, clearingPeriod: gameControl.period + 1});
                dispatch(getQualityRegisterById(loginData.id));
                dispatch(getPlayerById(loginData.id));
            }
        }
    }, [gameControl])

    useEffect(() => {
            if (dataPlayer.dinamicForms) {
                if (dataPlayer.dinamicForms.length > 0) {
                    var loans = dataPlayer.dinamicForms.filter(m => m.type === "loan" &&
                    m.clearingPeriod === gameControl.period)
                    if (loans.length > 0) {
                        let total = loans.reduce((a, b) => a + b.amount, 0)
                        setNetLoan(total)
                    }
                    else setNetLoan(0)
                }
                else setNetLoan(0)
            } 
            else setNetLoan(0)
    }, [dataPlayer])

    const changeValue = (e) => {
        var value = parseInt(e.target.value)
        value = value || ""
        setForm({...form, [e.target.name]: value})
    }
    
    const changeInvestment = (e) => {
        if (e.target.name === "amount") var value = parseInt(e.target.value)
        else if (e.target.name === "description") var value = e.target.value
        else var value = parseFloat(e.target.value)
        value = value || ""
        setInvestmentForm({...investmentForm, [e.target.name]: value})
    }
    
    const changeLoan = (e) => {
        if (e.target.name === "amount") var value = parseInt(e.target.value)
        else if (e.target.name === "description") var value = e.target.value
        else var value = parseFloat(e.target.value)
        value = value || ""
        setLoanForm({...loanForm, [e.target.name]: value})
    }

    const integerControl = (e) => {
        if (e.target.value > 1000000 || e.target.value < 0) setErrors({...errors, integer: "Debe ser un valor entero menor que 1000000 y mayor que 0"})
        else if (e.target.name.slice(0,7) === "quality" && e.target.value % 1 !== 0) setErrors({...errors, integer: "Deben ser unidades enteras, no decimales"})
        else setErrors({...errors, integer:"", general: "", dinform:""})
    }

    // const integerFinControl = (e) => {
    //     if (e.target.value > 1000000 || e.target.value < 0) setErrors({...errors, integer: "Debe ser un valor entero menor que 1000000 y mayor que 0"})
    //     else if (e.target.name.slice(0,7) === "quality" && e.target.value % 1 !== 0) setErrors({...errors, integer: "Deben ser unidades enteras, no decimales"})
    //     else setErrors({...errors, integer:"", general: "", dinform:""})
    // }

    const floatControl = (e) => {
        if (e.target.value < 0 || e.target.value >= 1) setErrors({...errors, dinform: "Debe ser un valor entre 0 y 1"})
        else setErrors({...errors, dinform:""})
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const submitForm = () => {
        const formul = {
            period: period,
            taxesRate: taxesRate,
            priceA: form.priceA,
            qualityA: form.qualityA + initQualityA,
            quantityA: form.quantityA,
            priceB: form.priceB,     
            qualityB: form.qualityB + initQualityB, 
            quantityB: form.quantityB, 
            priceC: form.priceC,
            qualityC: form.qualityC + initQualityC,
            quantityC: form.quantityC,
            qualityInvestment: (form.qualityA + form.qualityB + form.qualityC) * qualityInvCost, 
            productionInvestment: (costProdA * form.quantityA) + (costProdB * form.quantityB) + (costProdC * form.quantityC),
            finantialInvestment: form.finantialFixedInvestment + investmentForm.amount,
            finantialFixedInvestment: form.finantialFixedInvestment,
            finantialFixedRentability: form.finantialFixedRentability
        }

        swalWithBootstrapButtons.fire({
            text: "Are you sure?",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(createActionForm(loginData.id, formul, loanForm, investmentForm));
                swalWithBootstrapButtons.fire({
                    text: 'Form sent!',
                    timer: 1000
                })
               setTimeout(()=> window.location.reload(), 1500)
            } 

          })
        
    }

    var rateFinantialFixedInvestment = ((form.finantialFixedRentability / form.finantialFixedInvestment * 100).toFixed(2)) || 0
    var finalAmountDinamicFinantial = ((investmentForm.amount * (investmentForm.rate + 1)).toFixed(2)) || 0

    var totalAcc = ( form.quantityA * costProdA + 
        form.quantityB * costProdB + 
        form.quantityC * costProdC +
        ((form.qualityA + form.qualityB + form.qualityC ) * qualityInvCost) +
        form.finantialFixedInvestment + investmentForm.amount
        )
    
    const capitalGame = (parseInt(initialCapital) - (netLoan) + loanForm.amount) || 0

    var controlProd = ((form.quantityA * costProdA) / (productionCapacity / 100)) +
                      ((form.quantityB * costProdB) / (productionCapacity / 100)) +
                      ((form.quantityC * costProdC) / (productionCapacity / 100))

    if (controlProd > (100) && errors.general === "") {
        setErrors({...errors, general: `La capacidad de la planta en general no puede superar el ${100}%`})
    }
    if (controlProd < minProductCapacity && errors.general === "") {
        setErrors({...errors, general: `La capacidad de la planta no puede ser inferior al ${minProductCapacity}%`})
    }
    if ((form.finantialFixedInvestment + investmentForm.amount) > maxTotalFinInvestAmount && errors.general === "") {
        setErrors({...errors, general: `Monto máximo de inversión financiera superado (${maxTotalFinInvestAmount})`})
    }
    if ( totalAcc > capitalGame && errors.general === "") {
        setErrors({...errors, general: `Capital insuficiente`})
    }
    if ( (loanForm.clearingPeriod < (period + 1) || loanForm.clearingPeriod > 5) && errors.dinform === "") {
        setErrors({...errors, dinform: `El período de liquidación del préstamo no puede ser anterior al período en juego ni mayor a 5`})
    }
    if ( (form.finantialFixedRentability / form.finantialFixedInvestment) > maxRateFinFixedInvest && errors.general === "") {
        setErrors({...errors, general: `La tasa de rentabilidad para inversiones fijas es superior a la permitida (${maxRateFinFixedInvest})`})
    }
    if ( loanForm.amount > maxLoanAmount && errors.dinform === "") {
        setErrors({...errors, dinform: `El monto del préstamo supera al permitido (${maxLoanAmount})`})
    }
    if ( loanForm.rate < minRateLoan && loanForm.amount > 0 && errors.dinform === "") {
        setErrors({...errors, dinform: `La tasa del préstamo no puede ser inferior a ${minRateLoan}`})
    }
    if ( investmentForm.rate > maxRateFinDinInvest && investmentForm.amount > 0 && errors.dinform === "") {
        setErrors({...errors, dinform: `La tasa de rentabilidad de la inversión dinámica no puede ser superior a ${maxRateFinDinInvest}`})
    }

    var disabled = true

    if (
        errors.general === "" &&
        errors.integer === "" &&
        errors.total === ""
        ) {disabled = false}

    return (
        (allowed && gameControl.actionGame === 0)?
        (<>
            <h4>
                Datos de la empresa
            </h4>
            <Table size="sm" hover={true}>
                <thead>
                    <tr>
                        <th>
                            Concepto
                        </th>
                        <th>
                            Monto
                        </th>   
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Capital Inicial:
                        </td>
                        <td>
                            {parseCurrency(initialCapital)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Pago de préstamos (k):
                        </td>
                        <td>
                            {parseCurrency(netLoan)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Préstamos a tomar:
                        </td>
                        <td>
                            {parseCurrency(loanForm.amount)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Neto - en juego:
                        </td>
                        <td>
                            {parseCurrency(capitalGame)}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Producto
                        </th>
                        <th>
                            Calidad
                        </th>   
                    </tr>
                    <tr>
                        <td>
                            Producto A:
                        </td>
                        <td>
                            {initQualityA}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Producto B:
                        </td>
                        <td>
                            {initQualityB}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Producto C:
                        </td>
                        <td>
                            {initQualityC}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <h4>
                Formulario - Plan de acción
            </h4>
        <Table>
            <thead>
                <tr>
                    <th>
                        Parte de Producción
                    </th>
                    <th>
                        Observación / Detalle
                    </th>
                    <th>
                        Valor
                    </th>
                    <th>
                        % de planta
                    </th>
                    <th>
                        Puntos de Calidad / Stock 
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Precio A.
                    </td>
                    <td>
                        Indicar el precio de venta en el mercado del producto A.
                    </td>
                    <td>
                        <input name="priceA" value={form.priceA} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                    <td>
                        -
                    </td>
                    <td>
                        -
                    </td>
                </tr>
                <tr>
                    <td>
                        Producción de A.
                    </td>
                    <td>
                        Indicar la cantidad a generar del producto A. Cada producto consume 2% de uso de planta.
                    </td>
                    <td>
                        <span>$ {form.quantityA * costProdA}</span>
                    </td>
                    <td>
                        <span> {(form.quantityA * costProdA) / (productionCapacity / 100)} %</span>
                    </td>
                    <td>
                        <input name="quantityA" value={form.quantityA} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Inversión en Calidad de A.
                    </td>
                    <td>
                        Inversión en calidad del producto A. Costo por punto de calidad: {qualityInvCost}
                    </td>
                    <td>
                        <span>$ {form.qualityA * qualityInvCost}</span>
                    </td>
                    <td>
                        -
                    </td>
                    
                    <td>
                        <input name="qualityA" value={form.qualityA} type="number" onChange={(e) => {changeValue(e); integerControl(e)} }/>
                    </td>
                </tr>

                <tr>
                    <td>
                        Precio B.
                    </td>
                    <td>
                        Indicar el precio de venta en el mercado del producto B.
                    </td>
                    <td>
                        <input name="priceB" value={form.priceB} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                    <td>
                        -
                    </td>
                    <td>
                        -
                    </td>
                </tr>
                <tr>
                    <td>
                        Producción de B.
                    </td>
                    <td>
                        Indicar la cantidad a generar del producto B. Cada producto consume 1% de uso de planta.
                    </td>
                    <td>
                        <span>$ {form.quantityB * costProdB}</span>
                    </td>
                    <td>
                        <span> {(form.quantityB * costProdB) / (productionCapacity / 100)} %</span>
                    </td>
                    <td>
                        <input name="quantityB" value={form.quantityB} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Inversión en Calidad de B.
                    </td>
                    <td>
                        Inversión en calidad del producto B. Costo por punto de calidad: {qualityInvCost}
                    </td>
                    <td>
                        <span>$ {form.qualityB * qualityInvCost}</span>
                    </td>
                    <td>
                        -
                    </td>
                    
                    <td>
                        <input name="qualityB" value={form.qualityB} type="number" onChange={(e) => {changeValue(e); integerControl(e)} }/>
                    </td>
                </tr>

                <tr>
                    <td>
                        Precio C.
                    </td>
                    <td>
                        Indicar el precio de venta en el mercado del producto C.
                    </td>
                    <td>
                        <input name="priceC" value={form.priceC} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                    <td>
                        -
                    </td>
                    <td>
                        -
                    </td>
                </tr>
                <tr>
                    <td>
                        Producción de C.
                    </td>
                    <td>
                        Indicar la cantidad a generar del producto C. Cada producto consume 0,5% de uso de planta.
                    </td>
                    <td>
                        <span>$ {form.quantityC * costProdC}</span>
                    </td>
                    <td>
                        <span> {(form.quantityC * costProdC) / (productionCapacity / 100)} %</span>
                    </td>
                    <td>
                        <input name="quantityC" value={form.quantityC} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Inversión en Calidad de C.
                    </td>
                    <td>
                        Inversión en calidad del producto C. Costo por punto de calidad: {qualityInvCost}
                    </td>
                    <td>
                        <span>$ {form.qualityC * qualityInvCost}</span>
                    </td>
                    <td>
                        -
                    </td>
                    
                    <td>
                        <input name="qualityC" value={form.qualityC} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                </tr>

                <tr>
                    <td>
                        Totales
                    </td>
                    <td>
                        -
                    </td>
                    <td>
                        -
                    </td>
                    <td>
                        {controlProd} %
                    </td>
                </tr>
                </tbody>
                <thead>
                <tr>
                    <th>
                        Parte Financiera
                    </th>
                    <th>
                        Observación / Detalle
                    </th>
                    <th>
                        Monto
                    </th>
                    <th>
                        % Tasa
                    </th>
                    <th>
                        Total 
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>
                        Inversión Financiera Fija. 
                    </th>
                </tr>
                <tr>
                    <td>
                        Inversión Financiera Fija.
                    </td>
                    <td>
                        Inversión a plazo conocido. Indicar en la primera celda el monto destinado, en la segunda la ganancia neta.
                    </td>
                    <td>
                        <input name="finantialFixedInvestment" value={form.finantialFixedInvestment} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                    <td>
                        <span>{rateFinantialFixedInvestment || 0} %</span>
                    </td>
                    <td>
                        <input name="finantialFixedRentability" value={form.finantialFixedRentability} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                </tr>
                    <tr>
                        <th>
                            Inversión Financiera Variable. 
                        </th>
                    </tr>
                
                <tr>
                    <td>
                        Inversión Financiera Variable.
                    </td>
                    <td>
                        Inversión abierta. Indicar monto y tasa tentativa.
                    </td>
                    <td>
                        <input name="amount" value={investmentForm.amount} type="number" onChange={(e) => {changeInvestment(e); integerControl(e)}}/>
                    </td>
                    <td>
                        <input name="rate" value={investmentForm.rate} type="number" onChange={(e) => {changeInvestment(e); floatControl(e)}}/>
                    </td>
                    <td>
                        <span> $ {finalAmountDinamicFinantial}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Descripción
                    </td>
                    <td>
                        Indicar un link al cual recurrir para consultar la información de la posición.
                    </td>
                    <td>
                        <input name="description" value={investmentForm.description} type="text" onChange={(e) => {changeInvestment(e)}}/>
                    </td>
                </tr>

                    <tr>
                        <th>
                            Préstamo.
                        </th>
                        <th>
                            Observación / Detalle
                        </th>
                        <th>
                            Monto
                        </th>
                        <th>
                            % Tasa
                        </th>
                        <th>
                            Período de liquidación. 
                        </th>
                    </tr>
                
                <tr>
                    <td>
                        Préstamo.
                    </td>
                    <td>
                        Indicar monto a solicitar. Se sumará el monto al capital neto en juego. Indicar período de liquidación.  
                    </td>
                    <td>
                        <input name="amount" value={loanForm.amount} type="number" onChange={(e) => {changeLoan(e); integerControl(e)}}/>
                    </td>
                    <td>
                        <input name="rate" value={loanForm.rate} type="number" onChange={(e) => {changeLoan(e); floatControl(e)}}/>
                    </td>
                    <td>
                        <input name="clearingPeriod" value={loanForm.clearingPeriod} type="number" onChange={(e) => {changeLoan(e); integerControl(e)}}/>
                    </td>
                </tr>

                <tr>
                    <td>
                        Descripción
                    </td>
                    <td>
                        Indicar un link al cual recurrir para consultar la información de la posición.
                    </td>
                    <td>
                        <input name="description" value={loanForm.description} type="text" onChange={(e) => {changeLoan(e)}}/>
                    </td>
                </tr>

                <tr>
                    <th>
                        {null}
                    </th>
                    <th>
                        Total acumulado
                    </th>
                    <th>
                        {parseCurrency(totalAcc)}
                    </th>
                </tr>

            </tbody>
        </Table>
        <h4>
            Control
        </h4>
            <Container>
            {(errors.general !== "") ? <Alert variant={"danger"}>{errors.general}</Alert>: <Alert variant={"success"}>Control General OK</Alert>}
            {(errors.integer !== "") ? <Alert variant={"danger"}>{errors.integer}</Alert>: <Alert variant={"success"}>Control de enteros OK</Alert>}
            {(errors.dinform !== "") ? <Alert variant={"danger"}>{errors.dinform}</Alert>: <Alert variant={"success"}>Control de formulario dinámico OK</Alert>}
            {(errors.total !== "") ? <Alert variant={"danger"}>{errors.total}</Alert>: <Alert variant={"success"}>Control de total OK</Alert>}
            </Container>
        <Button type="submit" disabled={disabled} onClick={() => submitForm()}>Enviar</Button>
        </>)
        :
        (<>
            <Alert variant={"warning"}>You are not allowed to present a form. Maybe you have already done it for this period.</Alert>
        </>)
    )
}