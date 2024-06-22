import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { port } from '../../App'
import { toast } from 'react-toastify'

const CreateDesignation = (props) => {
    let { show, setshow } = props
    let [departments, set_Department_List] = useState()
    let [obj, setobj] = useState({
        Department : '',
        Name: ''
    })
    let handleChange = (e) => {
        let {name, value} = e.target
        setobj((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    let getdepartments = () => {
        axios.get(`${port}root/ems/Departments/`)
            .then((r) => {
                set_Department_List(r.data)
                console.log("Departments_List_Res", r.data)
            })
            .catch((err) => {
                console.log("Departments_List_err", err)
            })
    }
    let handleSubmit = () => {
        console.log(obj);
        axios.post(`${port}/root/ems/Designation/${obj.Department}/`,obj ).then((response) => {
            toast.success('Designation added successfully')
            console.log(response.data);
            setshow(false)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getdepartments()
    }, [])
    return (
        show && <Modal show={show} centered onHide={() => setshow(false)}  >
            <Modal.Header closeButton>
                Create a Designation
            </Modal.Header>
            <Modal.Body>
                <div className='flex items-center gap-2 my-3 '>
                    Choose a Department :
                    <select  value={obj.Department} name="Department" 
                    onChange={handleChange} className='p-2 rounded outline-none border-2 ' id="">
                        <option value="">Select</option>
                        {
                            departments && departments.map((obj) => (
                                <option value={obj.id}>{obj.Dep_Name} </option>
                            ))
                        }
                    </select>

                </div>
                <div className='flex gap-3 my-3 items-center'>
                    Designation Name :
                    <input type="text" value={obj.Name} name='Name' 
                    onChange={handleChange} className='p-2 outline-none border-2 rounded ' />
                </div>
                <button onClick={handleSubmit} className='p-2 rounded bg-blue-600 text-white '>Add Designation </button>
            </Modal.Body>
        </Modal>
    )
}

export default CreateDesignation