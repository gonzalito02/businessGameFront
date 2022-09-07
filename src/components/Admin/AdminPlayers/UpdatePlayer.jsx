import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import { useDispatch, useSelector } from "react-redux";
import { allowToPlay, submitUpdate, updateDataPlayer } from "../../../redux/actions/actions";

export default function UpdatePlayer ({data}) {

    const dispatch = useDispatch()

    const submit = useSelector(state => state.submit)
    const [input, setInput] = useState(true)

    var { 
        id,
        index,
        initialCapital,
        group,
     } = data

    const [form, setForm] = useState({
        index,
        initialCapital,
        group,
    })

    const handleInput = () => {
        if (!input) {dispatch(updateDataPlayer(id, form)); dispatch(submitUpdate())}
        else {
        setForm({
            index: index,
            initialCapital: initialCapital,
            group: group,
        });
        }
        setInput(!input)
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleAllow = (e) => {
        dispatch(allowToPlay(id)); 
        dispatch(submitUpdate())
    }

    return (
        <>        
            <Table>
                <tbody>            
                        <tr>    
                            <td>
                                Group
                            </td>
                            
                            {input? 
                            <td> {group} </td> :
                            <input name="group" type="text" value={form.group} onChange={(e) => handleChange(e)}></input>
                            }
                        </tr>
                        <tr>    
                            <td>
                                Index
                            </td>
                            
                            {input? 
                            <td> {index} </td> :
                            <input name="index" type="number" value={form.index} onChange={(e) => handleChange(e)}></input>
                            }
                        </tr>
                        <tr>    
                            <td>
                                Initial Capital
                            </td>
                            
                            {input? 
                            <td> {initialCapital} </td> :
                            <input name="initialCapital" type="number" value={form.initialCapital} onChange={(e) => handleChange(e)}></input>
                            }
                        </tr>   
                </tbody>
            </Table>
            <Button onClick={()=> handleInput()}>{input? "Modificar":"Aplicar"}</Button>
            <span>{" "}</span>
            <Button onClick={()=> handleAllow()}>Change AllowPlay</Button>
        </>
    )
}