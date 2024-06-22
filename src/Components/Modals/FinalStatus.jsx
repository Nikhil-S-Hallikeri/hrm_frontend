import axios from 'axios'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { port } from '../../App'

const FinalStatus = (props) => {
    let { show, setshow } = props
    let empid=JSON.parse(sessionStorage.getItem('user')).EmployeeId
    let [obj,setObj]=useState({
        Final_Result:'',
        Comments:''
    })
    let handleSubmit = () => {
        axios.post(`${port}/root/FinalStatusUpdate`, {
            CandidateId: show,
            ReviewedBy:empid,
            Final_Result:obj.Final_Result,
            Comments:obj.Comments
        }).then((response) => {
            console.log(response.data);
            setshow(false)
        }).catch((error) => {
            console.log(error);
        })
    }
    let handleChange=(e)=>{
        let {value,name}=e.target 
        setObj((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    return (
        <div>
            {show && <Modal centered show={show} onHide={() => setshow(false)} >
                <Modal.Header closeButton>
                    Final Status for {show}
                </Modal.Header>
                <Modal.Body>
                    <main className=' '>
                        <div className='flex justify-between'>
                            <label className='w-52' htmlFor=""> Final Status :</label>
                            <select value={obj.Final_Result} name='Final_Result' onChange={handleChange} className="p-2 w-full outline-none border-2 rounded " id="ageGroup" >
                                <option value="">Select</option>
                                <option value="consider_to_client">Consider to Client</option>
                                <option value="Internal_Hiring">Internal Hireing</option>
                                <option value="Reject">Reject</option>
                                <option value="on_hold">On Hold</option>
                            </select>
                        </div>
                        <div className='flex justify-between items-center'>
                            <label className='w-52' htmlFor=""> Comment : </label>
                            <input value={obj.Comments} name='Comments' onChange={handleChange} type="text" className='w-full outline-none border-2 rounded p-2 my-2  ' />
                        </div>
                    </main>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleSubmit} className='p-2 rounded bg-blue-600 text-white  '>
                        Submit
                    </button>
                </Modal.Footer>

            </Modal>}
        </div>
    )
}

export default FinalStatus