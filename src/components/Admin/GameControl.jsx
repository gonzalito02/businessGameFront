import React, { useEffect, useMemo, useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Table from "react-bootstrap/esm/Table"
import { useDispatch, useSelector } from "react-redux"
import { getGameControl, submitUpdate, updateGameControl } from "../../redux/actions/actions"

export default function GameControl () {

    const dispatch = useDispatch()

    var gameControl = useSelector(state => state.gameControl)
    var submit = useSelector(state => state.submit)

    var [error, setError] = useState("")

    useEffect(() => {
        dispatch(getGameControl())
    }, [dispatch, submit])

    var { 
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
        maxTotalFinInvestAmount,
        actionGame,
        wallet } = gameControl

    const [form, setForm] = useState({
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
        maxTotalFinInvestAmount,
        actionGame,
        wallet
    })

    const [input, setInput] = useState(true)

    const handleInput = () => {
        if (!input) {dispatch(updateGameControl(form)); dispatch(submitUpdate())}
        else {
        setForm({
            period: period,
            taxesRate: taxesRate,
            qualityInvCost: qualityInvCost,
            productionCapacity: productionCapacity,
            costProdA: costProdA,
            costProdB: costProdB,
            costProdC: costProdC,
            minProductCapacity: minProductCapacity,
            minRateLoan: minRateLoan,
            maxLoanAmount: maxLoanAmount,
            maxRateFinDinInvest: maxRateFinDinInvest,
            maxRateFinFixedInvest: maxRateFinFixedInvest,
            maxTotalFinInvestAmount: maxTotalFinInvestAmount,
            actionGame: actionGame,
            wallet: wallet
        });
        }
        setInput(!input)
    }

    const handleChange = (e) => {
        if(e.target.value > 99999999) {setError("Must be numbers lower than 999999999")}
        else if(!e.target.value) {setForm({...form, [e.target.name]: 0})}
        else {
        setForm({...form, [e.target.name]: parseFloat(e.target.value)})
        setError("")
        }
    }

    return (
        <>
            <Table>
                <thead>
                        <tr>
                            <th>
                                Concepto
                            </th>
                            <th>
                                Valor
                            </th>
                        </tr>
                </thead>
                <tbody>
                  
                        <tr>
                            
                            <td>
                                Period
                            </td>
                            
                            {input? 
                            <td> {period} </td> :
                            <input name="period" type="number" value={form.period} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                QualityInvCost
                            </td>
                            
                            {input? 
                            <td> {qualityInvCost} </td> :
                            <input name="qualityInvCost" type="number" value={form.qualityInvCost} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                ProductionCapacity
                            </td>
                            
                            {input? 
                            <td> {productionCapacity} </td> :
                            <input name="productionCapacity" type="number" value={form.productionCapacity} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                CostProdA
                            </td>
                            
                            {input? 
                            <td> {costProdA} </td> :
                            <input name="costProdA" type="number" value={form.costProdA} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                CostProdB
                            </td>
                            
                            {input? 
                            <td> {costProdB} </td> :
                            <input name="costProdB" type="number" value={form.costProdB} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                CostProdC
                            </td>
                            
                            {input? 
                            <td> {costProdC} </td> :
                            <input name="costProdC" type="number" value={form.costProdC} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                MinProductCapacity
                            </td>
                            
                            {input? 
                            <td> {minProductCapacity} </td> :
                            <input name="minProductCapacity" type="number" value={form.minProductCapacity} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                MinRateLoan
                            </td>
                            
                            {input? 
                            <td> {minRateLoan} </td> :
                            <input name="minRateLoan" type="number" value={form.minRateLoan} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                MaxLoanAmount
                            </td>
                            
                            {input? 
                            <td> {maxLoanAmount} </td> :
                            <input name="maxLoanAmount" type="number" value={form.maxLoanAmount} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                MaxRateFinDinInvest
                            </td>
                            
                            {input? 
                            <td> {maxRateFinDinInvest} </td> :
                            <input name="maxRateFinDinInvest" type="number" value={form.maxRateFinDinInvest} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                MaxRateFinFixedInvest
                            </td>
                            
                            {input? 
                            <td> {maxRateFinFixedInvest} </td> :
                            <input name="maxRateFinFixedInvest" type="number" value={form.maxRateFinFixedInvest} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                MaxTotalFinInvestAmount
                            </td>
                            
                            {input? 
                            <td> {maxTotalFinInvestAmount} </td> :
                            <input name="maxTotalFinInvestAmount" type="number" value={form.maxTotalFinInvestAmount} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                ActionGame
                            </td>
                            
                            {input? 
                            <td> {actionGame} </td> :
                            <input name="actionGame" type="number" value={form.actionGame} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                Taxes
                            </td>
                            
                            {input? 
                            <td> {taxesRate} </td> :
                            <input name="taxesRate" type="number" value={form.taxesRate} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>
    
            </tbody>
            </Table>
            <Button onClick={()=> handleInput()}>{input? "Modificar":"Aplicar"}</Button>
            <span>{error}</span>
        </>
    )
}