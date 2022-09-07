import React, { useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Table from "react-bootstrap/esm/Table"
import { useDispatch } from "react-redux"
import { createStudent } from "../../../redux/actions/actions"

export default function AdminStudentCreate () {

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        id: "",
        name: "",
        password: "",
        email: "",
        rol: "student"
    })

    const handleSubmit = () => {
        dispatch(createStudent(form));
        setForm({
            id: "",
            name: "",
            password: "",
            email: "",
            rol: "student"
        })
        console.log("created")
    }

    const handleChange = (e) => {
        if (e.target.name === "id") var value = parseInt(e.target.value)
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
                                Nombre
                            </td> 
                            <td> 
                                <input name="name" value={form.name} onChange={(e) => handleChange(e)}></input> 
                            </td> 

                        </tr>

                        <tr>

                            <td>
                                DNI
                            </td> 
                            <td> 
                                <input name="id" type="number" value={form.id} onChange={(e) => handleChange(e)}></input> 
                            </td> 

                        </tr>
                  
                        <tr>
                            
                            <td>
                                Email
                            </td> 
                            <td> 
                                <input name="email" value={form.email} onChange={(e) => handleChange(e)}></input>
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

                        <tr>
                            <td>
                                Rol
                            </td> 
                            <td> 
                                <input name="rol" value={form.rol}></input>
                            </td>
                        </tr>
    
                </tbody>
            </Table>
            <Button onClick={()=> handleSubmit()}>Create</Button>
        </>
    )
}