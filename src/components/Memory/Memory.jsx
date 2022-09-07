import React, { useState } from "react";
import { useEffect } from "react";
import NavBar from "../NavBar";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { createMemory, deleteMemory, getMemory, submitUpdate } from "../../redux/actions/actions";
import Card from 'react-bootstrap/Card';
import { Button } from "bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2'

export default function Memory () {

    const dispatch = useDispatch()

    const memories = useSelector((state) => state.memory)
    const submit = useSelector((state) => state.submit)
    var loginUser = useSelector(state => state.userLogin)

    const [data, setData] = useState({author: "", text: ""})

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleClick = () => {
        dispatch(createMemory(data));
        dispatch(submitUpdate())
        swalWithBootstrapButtons.fire({
            text: `Memory created`,
            timer: 2500
        })
        setData({...data, author: "", text: ""})
    }

    const handleDelete = (memory) => {
        dispatch(deleteMemory(memory.id));
        dispatch(submitUpdate())
        swalWithBootstrapButtons.fire({
            text: `Memory deleted`,
            timer: 2500
        })
    }

    useEffect(() => {
        dispatch(getMemory())
    }, [dispatch, submit])

    return (
        <>
        <NavBar />
        {(loginUser.rol === "admin")?
        <Container>
             <Form style={{ width: '100%', border: "solid black 1px", borderRadius: "10px", padding: "10px", margin: "10px", backgroundColor: "Lightgrey"}}>
                <Row>
                    <span>Author</span>
                    <Form.Control  name="author" value={data.author} type="text" onChange={(e) => {handleChange(e)}} placeholder="author">
                    </Form.Control>
                    <span>Text</span>
                    <Form.Control style={{height: "150px"}} name="text" value={data.text} as="textarea" rows={10} onChange={(e) => {handleChange(e)}} placeholder="text">
                    </Form.Control>
                </Row>
                <br/>
                <button onClick={() => handleClick()}>
                Create memory
                </button>
             </Form>
        </Container>
        :
        null
        }
        <Container>
            {memories? memories.map( m => { 
            return (
                <Card.Body style={{ width: '100%', border: "solid black 1px", borderRadius: "10px", padding: "10px", margin: "10px", backgroundColor: "LightSteelBlue"}}>
                    <Card.Subtitle>{m.createdAt.slice(0,10)}</Card.Subtitle>
                    <Card.Subtitle>{m.author}</Card.Subtitle>
                    <Card.Text>{m.text}</Card.Text>
                    {(loginUser.rol === "admin")? <button onClick={() => handleDelete(m)}>Delete memory</button> : null}  
                </Card.Body>
            )
            })
            :
            <h3>No memories yet</h3>
            }
        </Container>
        </>
    )
}