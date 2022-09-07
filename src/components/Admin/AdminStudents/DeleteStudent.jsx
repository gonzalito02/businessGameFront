import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, setToNullBusiness, submitUpdate } from "../../../redux/actions/actions";
import Swal from 'sweetalert2'

export default function DeleteStudent ({data}) {

    console.log(data.playerId)
    const dispatch = useDispatch()
    const submit = useSelector(state => state.submit)

    const ids = {
        id : data.id
    }

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

    const handleClick = () => {
        swalWithBootstrapButtons.fire({
            text: "Are you sure?",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteStudent(data.id));
                Toast.fire({
                    icon: 'success',
                    title: 'Student deleted!'
                })
                dispatch(submitUpdate())
            } 
          })

    }
    const handleSecondClick = () => {
        dispatch(setToNullBusiness(ids));
        dispatch(submitUpdate())
    }

    return (
        <>
            <Button onClick={(e) => handleClick()}>
                Delete
            </Button>
            <span>{" "}</span>
            <Button disabled={data.playerId === null? true : false} onClick={(e) => handleSecondClick()}>
                Set to null business field
            </Button>
        </>
    )
}