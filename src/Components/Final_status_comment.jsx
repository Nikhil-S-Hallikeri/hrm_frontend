import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { port } from '../App'
import '../assets/css/media.css'
import { HrmStore } from '../Context/HrmContext';

const Final_status_comment = ({ selectedName, selectstatus, fetchdata3,
    candidateid, final_status_value, setselectstatus, setfinalvalue }) => {

    let { mailContent } = useContext(HrmStore)
    let Empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId
    let [loading, setloading] = useState(false)
    console.log("Selected candidate id", candidateid)
    console.log("status", final_status_value)
    const [statusreview, setStatusreview] = useState("")
    let [mailContentwritten, setMailContentwritten] = useState()

    const navi = useNavigate();
    useEffect(() => {
        console.log(selectedName);
        if (final_status_value && selectedName) {
            let content
            if(final_status_value=='Internal_Hiring')
                content=mailContent.selected
            if(final_status_value=='Reject')
                content=mailContent.reject
            if(final_status_value=='on_hold')
                content=mailContent.on_hold
            if(final_status_value=='consider_to_client')
                content=mailContent.consider_to_client
            setMailContentwritten(`Dear ${selectedName}, \n ${content}`)
        }
    }, [selectedName, final_status_value])

    let handlestatusreview = (e) => {
        e.preventDefault();
        // console.log(statusreview,candidateid);


        const formData1 = new FormData()

        formData1.append('Final_Result', final_status_value);
        formData1.append('CandidateId', candidateid);
        formData1.append('Comments', statusreview);
        formData1.append('ReviewedBy', Empid);
        formData1.append('Email_Message', mailContentwritten.replace(/\\n/g, '\n'));


        for (let pair of formData1.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        setloading(true)
        {
            axios.post(`${port}/root/FinalStatusUpdate`, formData1)
                .then((r) => {
                    setfinalvalue(final_status_value)
                    setloading(false)
                    fetchdata3()
                    alert("Final status comment send Successfull")
                    setStatusreview('')
                    setMailContentwritten(`Dear Candidate \n Congratulations!! \n  We are glad to inform you that you have successfully cracked at Merida Tech Minds.We consider you for Internal Hiring`)
                    // navi('/dashboard/HR')
                    console.log("statusreview_res", r.data)
                    setselectstatus((prev) => !prev)


                })
                .catch((err) => {
                    setloading(false)
                    console.log("statusreview_err", err)
                })
        }

    }





    return (
        <div style={{ position: 'fixed', left: '0px', top: '0px', width: '100%', zIndex: 5 }} className={`p-1 p-sm-4  otp-verification-container ${selectstatus ? '' : 'd-none'} `}>
            <div className='otp_verification'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-bottom p-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Status Review</h1>
                            <button type="button" className="btn-close" onClick={() => { setselectstatus(false) }}  ></button>
                        </div>
                        <div className="modal-body border-bottom p-2">
                            <div className='d-flex justify-content-center'>

                                <textarea className='no-border border-0 ' placeholder='write here ...' name="" id="" style={{ width: '100%' }} value={statusreview} onChange={(e) => setStatusreview(e.target.value)} ></textarea>
                            </div>
                        </div>
                        {/* Mail cotent */}
                        <div>
                            <label htmlFor="" className='my-3'> Mail Content : <span className='text-blue-600 text-xs '>( Use \n to insert the Line in the mail )</span>  </label>
                            <textarea name="" value={mailContentwritten} className='outline-none border-2 rounded p-2 block w-full ' rows={5} onChange={(e) => setMailContentwritten(e.target.value)} id="">  </textarea>
                        </div>
                        <div className="modal-footer p-3">
                            <button type="button" onClick={handlestatusreview} disabled={loading} className="btn btn-primary" > {loading ? "loading.." : "Send"} </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Final_status_comment;
