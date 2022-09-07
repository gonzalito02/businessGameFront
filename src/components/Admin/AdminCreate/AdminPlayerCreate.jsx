import React, { useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Table from "react-bootstrap/esm/Table"
import { useDispatch } from "react-redux"
import { createPlayer } from "../../../redux/actions/actions"

export default function AdminPlayerCreate () {

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        id: "",
        officialName: "",
        group:"",
        members:"",
        password:""
    })

    const handleSubmit = () => {
        dispatch(createPlayer(form));
        setForm({
            id: "",
            officialName: "",
            group:"",
            members:"",
            password:""
        })
        console.log("created")
    }

    const handleChange = (e) => {
        if (e.target.name === "members") var value = e.target.value.split(",")
        else if (e.target.name === "playerId") var value = parseInt(e.target.value)
        else var value = e.target.value
        setForm({...form, [e.target.name]: value})
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
                                Input
                            </th>
                        </tr>
                </thead>
                <tbody>
                        <tr>

                            <td>
                                Razón Social
                            </td> 
                            <td> 
                                <input name="officialName" value={form.officialName} onChange={(e) => handleChange(e)}></input> 
                            </td> 

                        </tr>

                        <tr>

                            <td>
                                Id
                            </td> 
                            <td> 
                                <input name="id" type="number" value={form.id} onChange={(e) => handleChange(e)}></input> 
                            </td> 

                        </tr>
                  
                        <tr>
                            
                            <td>
                                Integrantes
                            </td> 
                            <td> 
                                <input name="members" value={form.members} onChange={(e) => handleChange(e)}></input>
                            </td>

                        </tr>

                        <tr>
                            
                            <td>
                                Grupo
                            </td> 
                            <td> 
                                <input name="group" value={form.group} onChange={(e) => handleChange(e)}></input>
                            </td>

                        </tr>

                        <tr>
                            <td>
                                Password
                            </td> 
                            <td> 
                                <input name="password" value={form.password} onChange={(e) => handleChange(e)}></input>
                            </td>
                        </tr>
    
                </tbody>
            </Table>
            <Button onClick={()=> handleSubmit()}>Create</Button>
        </>
    )
}