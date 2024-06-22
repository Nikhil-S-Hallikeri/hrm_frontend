import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { port } from '../App'
import '../assets/css/media.css'

const Final_status_comment = ({ selectstatus, candidateid, final_status_value, setselectstatus,setfinalvalue }) => {


    let Empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId

    console.log("Selected candidate id", candidateid)
    console.log("status", final_status_value)
    const [statusreview, setStatusreview] = useState("")


    const navi = useNavigate();


    let handlestatusreview = (e) => {
        e.preventDefault();
        // console.log(statusreview,candidateid);


        const formData1 = new FormData()

        formData1.append('Final_Result', final_status_value);
        formData1.append('CandidateId', candidateid);
        formData1.append('Comments', statusreview);
        formData1.append('ReviewedBy', Empid);


        for (let pair of formData1.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.post(`${port}/root/FinalStatusUpdate`, formData1)
            .then((r) => {

                setfinalvalue(final_status_value)
                alert("Final status comment send Successfull")
                setStatusreview('')
                navi('/dashboard/HR')
                console.log("statusreview_res", r.data)
                setselectstatus((prev) => !prev)
                

            })
            .catch((err) => {
                console.log("statusreview_err", err)
            })

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
                        <div className="modal-footer p-3">
                            <button type="button" onClick={handlestatusreview}  className="btn btn-primary" >Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Final_status_comment;
