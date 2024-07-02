import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { domain, port } from '../../App';
import { toast } from 'react-toastify';
import { HrmStore } from '../../Context/HrmContext';

const SchedulINterviewModalForm = (props) => {
    let { show, fetchdata, setshow, persondata, setPersondata, candidateId, setcandidateId,
        fetchdata2 } = props
    console.log(persondata);
    let [outsideMail, setOutSideMail] = useState()
    let [outsideINterview, setOutsideInterview] = useState(false)
    let [loading, setloading] = useState(false)
    let { convertTimeTo12HourFormat, timeValidate } = useContext(HrmStore)
    const [formData, setFormData] = useState({
        Candidate: "",
        InterviewRoundName: '',
        TaskAssigned: '',
        interviewer: '',
        InterviewDate: '',
        InterviewTime: '',
        InterviewType: '',
        login_user: ''
    });
    let Empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId
    const [Candidateid, setCandidate] = useState("")
    let [mailContent, setMailContent] = useState(`Dear Candidate \n Congratulations!! \n  We are glad to inform you that you have selected for the Next round. \nDate : ${formData.InterviewDate} \nTiming : ${formData.InterviewTime}  `)

    // Define the function 
    const sentparticularData = (id) => {
        setCandidate(id)
        // Define the data to be sent in the request
        const dataToSend = {
            id: id // Assuming id is the parameter passed to the function
        };

        // Send a POST request using Axios
        axios.get(`${port}/root/appliedcandidate/${id}/`, dataToSend)
            .then(response => {
                // Handle the response if needed
                console.log('Data--:', response.data);
                setPersondata(response.data)
                setCandidate(response.data.CandidateId)
            })
            .catch(error => {
                // Handle errors if any
                console.error('Error sending data:', error);
            });
    };
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (name == 'InterviewDate') {
            setMailContent(mailContent)
        }
        if (name == 'InterviewDate' && timeValidate() > value) {
            // alert(timeValidate())
            value = timeValidate()
        }
        setFormData({ ...formData, [name]: value });
    };
    const handleTimeInputChange = (e) => {
        setFormData({ ...formData, InterviewTime: e.target.value })
    }
    const handleSubmit = async (e) => {

        e.preventDefault();

        formData.Candidate = candidateId
        formData.login_user = Empid
        if (outsideMail) {
            formData.Other_EMP_Mail = outsideMail
            formData.review_form=`${domain}/interviewreview`
        }
        console.log("schedule_Interview",
            "formData", formData,
            "Login_user", Empid);
        setloading(true)
        axios.post(`${port}/root/interviewschedule`, {
            ...formData,
            Email_Message: mailContent.replace(/\\n/g, '\n')
        }).then((res) => {
            toast.success("Interview schedule Successfully..")
            setshow(false)
            fetchdata2()
            fetchdata()
            setloading(false)
            console.log("schedule_Interview_Data_res", res.data);
        }).catch((err) => {
            setloading(false)
            console.log("schedule_Interview_Data_res_err", err.data);
        })
    };
    useEffect(() => {
        sentparticularData()
        console.log(persondata);
    }, [persondata])
    const [interviewers, setInterviewers] = useState([]);
    useEffect(() => {
        axios.get(`${port}/root/interviewschedule`).then((e) => {

            console.log("Interviewer Data", e.data);
            setInterviewers(e.data)
        })
        // sentparticularData()
    }, [])
    return (
        <div>
            <Modal show={show} onHide={() => setshow(false)} >
                <Modal.Header closeButton>
                    <h1 class="modal-title fs-5" >Schedule Interview </h1>
                </Modal.Header>
                <Modal.Body>
                    <form id="interviewForm" onSubmit={handleSubmit} class="styled-form">
                        <div class="form-group">
                            <label for="candidateId">Candidate ID:</label>
                            <input type="text" id="CandidateId" value={candidateId}
                                class="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="InterviewRoundName">Interview Round Name:
                            </label>
                            <select id="InterviewRoundName" name="InterviewRoundName" value={formData.InterviewRoundName} onChange={handleInputChange} required class="form-control">
                                <option value="" selected>Select Round</option>
                                <option value="hr_round" >HR Round</option>
                                <option value="manager_round" >Manager Round</option>

                                <option value="technical_round" >Technical Round </option>
                            </select>
                        </div>

                        {/* <div class="form-group">
                            <label for="taskAssign">Task Assign:</label>
                            <input type="text" id="TaskAssigned" name="TaskAssigned" value={formData.TaskAssigned} onChange={handleInputChange} required class="form-control" />
                        </div> */}
                        <div class="form-group">
                            <section className='flex justify-between my-2'>
                                <label for="interviewer">Interviewer:</label>
                                <article className='flex gap-2 items-center'>
                                    Outsider :
                                    <div type='button'
                                        onClick={() => {
                                            setOutsideInterview(!outsideINterview);
                                            setOutSideMail('')
                                            setFormData((prev) => ({
                                                ...prev,
                                                interviewer: ''
                                            }))
                                        }}
                                        className={`w-16 h-8 flex rounded-full  shadow-sm ${outsideINterview ? 'bg-green-100' : 'bg-red-100'} bg-blue-100 `}>
                                        <p className={`w-6 ${outsideINterview ? 'translate-x-9 ' : 'translate-x-1'} h-6 my-auto m-0 duration-300 bg-white rounded-full shadow-sm `}> </p>
                                    </div>
                                </article>
                            </section>
                            {!outsideINterview && <select id="interviewer" name="interviewer" value={formData.interviewer} onChange={handleInputChange} required class="form-control">
                                <option value="" selected>Select Name</option>
                                {interviewers.map(interviewer => (
                                    <option key={interviewer.EmployeeId} value={interviewer.EmployeeId}>
                                        {`${interviewer.EmployeeId},${interviewer.Name}`}
                                    </option>
                                ))}
                            </select>}
                            {outsideINterview && <input type="text" id="mailId" placeholder='Enter the mail' value={outsideMail}
                                onChange={(e) => setOutSideMail(e.target.value)} class="form-control" />}
                        </div>
                        <div class="form-group">
                            <label for="interviewDate">Interview Date:</label>
                            <input type="date" id="InterviewDate" name="InterviewDate" value={formData.InterviewDate}
                                onChange={handleInputChange} required class="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="interviewTime">Interview Time:</label>
                            <input type="time" id="InterviewTime" name="InterviewDTime" onChange={handleTimeInputChange} required class="form-control" />
                        </div>

                        <div class="form-group">
                            <label for="InterviewType">Interview Type:</label>
                            <select id="InterviewType" name="InterviewType" value={formData.InterviewType} onChange={handleInputChange} required class="form-control">
                                <option value="" selected>Select Round</option>
                                <option value="online" >Online</option>
                                <option value="offline" >Offline</option>

                            </select>
                        </div>
                        <div>
                            <label htmlFor="" className='my-3'> Mail Content : <span className='text-blue-600 text-xs '>( Use \n to insert the Line in the mail )</span>  </label>
                            <textarea name="" value={mailContent} className='outline-none border-2 rounded p-2 block w-full ' rows={5} onChange={(e) => setMailContent(e.target.value)} id="">  </textarea>
                        </div>
                        <div class="form-group my-3 d-flex justify-content-between">
                            {/* <button class="btn btn-primary">Send Email</button> */}
                            <button disabled={loading} type="submit" class="btn ms-auto btn-success"> {loading ? "Loading" : "Schedule Interview"} </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>






        </div>
    )
}

export default SchedulINterviewModalForm