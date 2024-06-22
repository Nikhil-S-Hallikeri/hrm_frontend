import axios from 'axios'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { port } from '../../App'
import { toast } from 'react-toastify'

const CreateDepartment = (props) => {
    let { show, setshow, getdept } = props
    let [department, setDepartment] = useState()
    let submitDepartment = () => {
        axios.post(`${port}/root/ems/Departments/`, {
            Dep_Name: department
        }).then((response) => {
            toast.success("Department Created Successfully")
            setshow(false)
            getdept()
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
            show && <Modal show={show} centered onHide={() => setshow(false)} className='' >
                <Modal.Header closeButton>
                    Creating Department
                </Modal.Header>
                <Modal.Body>
                    <div className='flex items-center my-3 '>
                        <label htmlFor="">Department Name : </label>
                        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)}
                            className='p-2 outline-none border-2 rounded mx-2 ' />
                    </div>
                    <button onClick={submitDepartment} className='p-2 rounded bg-blue-600 text-white  '>Add department </button>
                </Modal.Body>
            </Modal>
    )
}

export default CreateDepartment