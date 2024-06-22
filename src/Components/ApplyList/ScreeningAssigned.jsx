import React, { useEffect, useState } from 'react'
import CandidateInformationModal from './CandidateInformationModal'
import axios from 'axios'
import { port } from '../../App'
import SceeringCompletedCandiateModal from '../Modals/SceeringCompletedCandiateModal'
import SchedulINterviewModalForm from './SchedulINterviewModalForm'

const ScreeningAssigned = (props) => {
    let [show, setshow] = useState(false)
    let { handlescreenedsearchvalue, searchscreenValue, fetchdata,fetchdata2,
        handle_screened_filter_value, handleCheckboxChange1,
        screeninglist_All, int_int_data, load1, screeninglistCompleted,
        search_filter_screened, screeninglist, Screening_screening_data, Screening_candidate_data } = props
    let [interviewSchedulForm, setInterviewScheduleForm] = useState(false)
    let [candidateIdInterview, setCandidateIdInterview] = useState()

    let [screeningCompletedApplicant, setScreeningCompletedApplicant] = useState()

    const [persondata, setPersondata] = useState({})
    const [Candidateid, setCandidate] = useState("")
    let [screeningCompletedCandidateDetailModal, setscreeningCompletedCandidateDetailModal] = useState(false)

    let [filteredCandiates, setfilteredCandidates] = useState(screeninglist)
    console.log(filteredCandiates);
    console.log(screeninglist);
    useEffect(() => {
        if (screeninglist) {
            setfilteredCandidates(screeninglist)
        }
    }, [screeninglist])
    let [assignOrCompleted, setAssignedorCompleted] = useState('Assigned')
    useEffect(() => {
        if (assignOrCompleted == 'Assigned')
            setfilteredCandidates(screeninglist)
        if (assignOrCompleted == 'Completed') {
            console.log(screeninglistCompleted);
            setfilteredCandidates(screeninglistCompleted)
        }
    }, [assignOrCompleted])
    const sentparticularData2 = (id, emp_id) => {

        console.log("send_", id);
        // setCandidate1(id)
        // setEmpid1(emp_id)

        // Define the data to be sent in the request
        const dataToSend = {
            id: id // Assuming id is the parameter passed to the function
        };

        // Send a POST request using Axios
        if (id) {
            axios.get(`${port}/root/Screening_Schedule_Data/${id}/${emp_id}/`, dataToSend)
                .then(response => {
                    // Handle the response if needed
                    console.log('paticular data:', response.data);
                    setPersondata(response.data.candidate_data)
                    setCandidate(response.data.CandidateId)
                    console.log("person data", response.data);
                })
                .catch(error => {
                    // Handle errors if any
                    console.error('Error sending data:', error);
                });
        }
    };
    const handleCompletedApplicant = (id) => {
        axios.get(`${port}/root/New-Candidate-Screening-Completed-Details/${id}/`).then((response) => {
            setScreeningCompletedApplicant(response.data)
            setscreeningCompletedCandidateDetailModal(true)
            console.log("Screening_Completed_Candidate", response.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div>
            {<SceeringCompletedCandiateModal show={screeningCompletedCandidateDetailModal}
                persondata={persondata}
                setshow={setscreeningCompletedCandidateDetailModal} setPersondata={setPersondata}
                data={screeningCompletedApplicant} />}
            {persondata && <SchedulINterviewModalForm candidateId={candidateIdInterview} setcandidateId={setCandidateIdInterview}
                fetchdata={fetchdata} fetchdata2={fetchdata2} show={interviewSchedulForm} persondata={persondata}
                setshow={setInterviewScheduleForm} setPersondata={setPersondata} />}
            <div className='d-flex justify-content-between mb-4 '>
                <div>
                    <div class="input-group mb-3 ">
                        <span class="input-group-text" id="basic-addon1"> <i class="fa-solid fa-magnifying-glass" ></i>  </span>
                        <input type="text" value={searchscreenValue} style={{ width: '200px', height: '30px', fontSize: '9px', outline: 'none' }}
                            onChange={(e) => {
                                handlescreenedsearchvalue(e.target.value, assignOrCompleted)
                            }} class="form-control shadow-none" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div>
                    <li class="nav-item text-primary d-flex me-4" style={{ fontSize: '18px' }} >
                        <select className="form-select shadow-none" id="ageGroup" style={{ width: '100px', height: '30px', fontSize: '9px', outline: 'none' }}
                            value={search_filter_screened} onChange={(e) => {
                                handle_screened_filter_value(e.target.value)
                            }} >
                            <option value="">Filter</option>
                            <option value="Today">Day</option>
                            <option value="Week">Week</option>
                            <option value="Month">Month</option>
                            <option value="Year">Year</option>
                        </select>

                    </li>
                </div>
            </div>
            <main className='border-1 bg-slate-400 rounded w-fit'>
                <button onClick={() => setAssignedorCompleted('Assigned')} className={`rounded transition duration-500 text-white p-2 ${assignOrCompleted == 'Assigned' ? "bg-blue-500" : 'bg-slate-400'}`}>
                    Assigned
                </button>
                <button onClick={() => setAssignedorCompleted('Completed')} className={`rounded transition duration-500 text-white p-2 ${assignOrCompleted == 'Completed' ? "bg-blue-500" : 'bg-slate-400'}`}>Completed</button>
            </main>

            {/* Second */}
            <div className='rounded  table-responsive mt-4'>
                <table class="table caption-top table-hover" style={{ width: '130%' }}>
                    <thead >
                        <tr >
                            <th scope="col"><span className='fw-medium'>All</span></th>
                            <th scope="col"><span className='fw-medium'>Name</span></th>
                            <th scope="col"><span className='fw-medium'>Canditate Id</span></th>
                            <th scope="col"><span className='fw-medium'>Assigned To</span></th>
                            <th scope="col"><span className='fw-medium'>AssignedBy</span></th>
                            <th scope="col"><span className='fw-medium'>Date Of Assigned</span></th>
                            <th scope="col"><span className='fw-medium'>Assigned_Status</span></th>
                            {assignOrCompleted != 'Assigned' &&
                                <th scope="col">
                                    <span className='fw-medium'>Screened Status</span></th>}
                            {assignOrCompleted != 'Assigned' &&
                                <th scope="col"><span className='fw-medium'>Assign Interview</span>
                                </th>}
                            {/* <th scope="col"><span className='fw-medium'>View</span></th> */}

                        </tr>
                    </thead>

                    {/* STATIC VALUE START */}

                    {/* <tr>

                        <td > 123</td>
                        <td >jerold</td>
                        <td >Null</td>
                        <td >23-12-2001</td>
                        <td >Mathavan</td>
                        <td >Assigned</td>
                        <td >Assigned</td>
                        <td className='text-center'><button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal5">
                          open
                        </button>
                        </td>
                      </tr> */}
                    <tbody>

                        {filteredCandiates != undefined && filteredCandiates != undefined && filteredCandiates.slice(0, load1).map((e) => {
                            console.log(e.candidate_details);
                            return (<tr key={e.id}>
                                <th scope="row"><input type="checkbox" value={e.Candidate} onChange={handleCheckboxChange1} /></th>
                                {/* <td onClick={() => sentparticularData(e.Candidate)} data-bs-toggle="modal" data-bs-target="#exampleModal5" style={{ cursor: 'pointer', color: 'blue' }}>{e.Name}</td> */}
                                {assignOrCompleted == 'assigned' &&
                                    <td onClick={() => sentparticularData2(e.Candidate, e.id)}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal5"
                                        style={{ color: 'blue', cursor: 'pointer' }}>{e.Candidate_name}</td>}
                                {assignOrCompleted != 'assigned' &&
                                    <td onClick={() => handleCompletedApplicant(e.Candidate)}
                                        style={{ color: 'green', cursor: 'pointer' }}>{e.Candidate_name}</td>}
                                <td>{e.Candidate}</td>
                                <td>{e.Recruiter}</td>
                                {/* <td>{e.Date_of_assigned} </td> */}
                                <td>{e.AssignedBy}</td>
                                <td>{e.Date_of_assigned}<small className='ms-2'>  </small>   {e.Time_of_assigned} </td>
                                <td>{e.Assigned_Status}</td>
                                {assignOrCompleted != 'assigned' && <td>{e.Review != null ? e.Review.Screening_Status : null}</td>}
                                {assignOrCompleted == 'completed' && <td>
                                    <button disabled={e.Review && e.Review.Screening_Status != 'scheduled'} onClick={() => {
                                        setCandidateIdInterview(e.Candidate)
                                        setInterviewScheduleForm(true);
                                        sentparticularData2(e.Candidate, e.id);
                                    }} className='p-1 text-xs rounded bg-blue-600 text-white'>Assign Interview </button>
                                </td>}
                                {/* <td>{e.Review != null ? e.Review.ReviewedOn : null}</td> */}
                                {/* <td onClick={() => sentparticularData(e.Candidate)} className='text-center'>
                              <button type="button" style={{ backgroundColor: 'rgb(160,217,180)' }} className="btn btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal5">
                                Open
                              </button>
                            </td> */}
                            </tr>)
                        })}
                    </tbody>
                    {/* open Particular Data Start */}
                    <CandidateInformationModal show={show} setshow={setshow}
                        Screening_screening_data={Screening_screening_data}
                        int_int_data={int_int_data}
                        Screening_candidate_data={Screening_candidate_data} />
                    {/* open Particular Data End */}
                </table>
            </div>

        </div>
    )
}

export default ScreeningAssigned