import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { port } from '../../App'
import { toast } from 'react-toastify'
import { HrmStore } from '../../Context/HrmContext'

const FinalStatus = (props) => {
    let { mailContent } = useContext(HrmStore)
    let { show, setshow, name ,getfunction} = props
    let empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId
    let [loading, setLoading] = useState(false)
    let [obj, setObj] = useState({
        Final_Result: '',
        Comments: '',
        Email_Message: ``
    })

    let handleSubmit = () => {
        console.log(obj.Email_Message.replace(/\\n/g, '\n'));
        console.log(obj);
        // return
        if (obj.Final_Result) {
            setLoading(true)
            axios.post(`${port}/root/FinalStatusUpdate`, {
                CandidateId: show,
                ReviewedBy: empid,
                Final_Result: obj.Final_Result,
                Comments: obj.Comments,
                Email_Message: obj.Email_Message.replace(/\\n/g, '\n')
            }).then((response) => {
                console.log(response.data);
                setLoading(false)
                getfunction()
                toast.success('Mail sended to candidate.')
                setObj({
                    Final_Result: '',
                    Comments: '',
                    Email_Message: ``
                })
                setshow(false)
            }).catch((error) => {
                console.log(error);
                setLoading(false)
            })
        }
        else {
            toast.warning('Give the final status for the interview')
        }
    }
    let handleChange = (e) => {
        let { value, name } = e.target
        setObj((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        if (obj.Final_Result) {
            let content;
            if (obj.Final_Result == 'Internal_Hiring')
                content = mailContent.selected
            if (obj.Final_Result == 'Reject')
                content = mailContent.reject
            if (obj.Final_Result == 'On_Hold')
                content = mailContent.on_hold
            if (obj.Final_Result == 'consider_to_client')
                content = mailContent.consider_to_client
            setObj((prev) => ({
                ...prev,
                Email_Message: `Dear ${name}, \n ${content} `
            }))
        }
    }, [obj.Final_Result])
    return (
        <div>
            {show && <Modal centered show={show} onHide={() => {
                setshow(false); setObj({
                    Final_Result: '',
                    Comments: '',
                    Email_Message: ``
                })
            }}>
                <Modal.Header closeButton>
                    Final Status for {name && name}
                </Modal.Header>
                <Modal.Body>
                    <main className=' '>
                        <div className='flex justify-between'>
                            <label className='w-52' htmlFor=""> Final Status :</label>
                            <select value={obj.Final_Result} name='Final_Result'
                                onChange={handleChange} className="p-2 w-full outline-none border-2 rounded " id="ageGroup" >
                                <option value="">Select</option>
                                <option value="consider_to_client">Consider to Client for Merida </option>
                                <option value="Internal_Hiring"> Selected </option>
                                <option value="Reject">Reject</option>
                                <option value="On_Hold">On Hold</option>
                                <option value="Rejected_by_Candidate">Rejected by Candidate</option>

                                {/* <option value="Offer_did_not_accept">Offerd Did't Accept</option> */}
                            </select>
                        </div>

                        <div className='flex justify-between items-center'>
                            <label className='w-52' htmlFor=""> Comment : </label>
                            <input value={obj.Comments} name='Comments' onChange={handleChange} type="text" className='w-full outline-none border-2 rounded p-2 my-2  ' />
                        </div>
                        <div className=' items-start justify-between '>
                            <label htmlFor="" className='' > Email Content : <span className='text-blue-600 text-xs '>( Use \n to insert the Line in the mail )</span> </label>
                            <textarea name="Email_Message" rows={5} className='w-full p-1 outline-none border-2 rounded '
                                value={obj.Email_Message} onChange={handleChange} id=""></textarea>
                        </div>
                    </main>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleSubmit} className='p-2 rounded bg-blue-600 text-white  '>
                        {loading ? "loading.." : " Submit"}
                    </button>
                </Modal.Footer>

            </Modal>}
        </div>
    )
}

export default FinalStatus