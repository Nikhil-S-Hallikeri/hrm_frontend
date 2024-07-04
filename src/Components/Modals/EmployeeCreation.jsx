import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { port } from '../../App'
import { toast } from 'react-toastify'
import CreateDepartment from './CreateDepartment'
import CreateDesignation from './CreateDesignation'

const EmployeeCreation = (props) => {
    let { show, setshow, getEmp } = props
    let [loading, setloading] = useState(false)
    let [createDesignation, setCreatedesignation] = useState(false)
    let [obj, setobj] = useState({
        'full_name': '',
        'email': '',
        'gender': '',
        'date_of_birth': '',
        'mobile': '',
        'weight': '',
        'height': '',
        'permanent_address': '',
        'present_address': '',
        'hired_date': '',
        'Dasboard_Dig': '',
        'Designation': '',
        'reporting_to': '',
        'Department': '',
        'Employeement_Type': '',
        'internship_Duration_From': null,
        'internship_Duration_To': null,
        'probation_status': '',
        'probation_Duration_From': null,
        'probation_Duration_To': null,
        'applied_list_access': false,
        'screening_shedule_access': false,
        'interview_schedule_access': false,
        'final_status_access': false
    })
    let [createDepartmentModal, setCreateDepartmentModal] = useState(false)
    let handleChange = (e) => {
        let { name, value } = e.target
        if (name == 'Employeement_Type' && value == 'intern') {
            setobj((prev) => ({
                ...prev,
                probation_status: null,
                probation_Duration_From: null,
                probation_Duration_To: null
            }))
        }
        if (name == 'Employeement_Type' && value == 'permanent') {
            setobj((prev) => ({
                ...prev,
                internship_Duration_From: null,
                internship_Duration_To: null,
            }))
        }
        if (name == 'internship_Duration_From' && value > obj.internship_Duration_To
            && obj.internship_Duration_To != '') {
            setobj((prev) => ({
                ...prev,
                internship_Duration_From: obj.internship_Duration_To
            }))
            return
        }
        if (name == 'internship_Duration_To' && value < obj.internship_Duration_From) {
            setobj((prev) => ({
                ...prev,
                internship_Duration_To: obj.internship_Duration_From
            }))
            return
        }
        if (name == 'probation_Duration_From' && value > obj.probation_Duration_To &&
            obj.probation_Duration_To != '') {
            setobj((prev) => ({
                ...prev,
                probation_Duration_From: obj.probation_Duration_To
            }))
            return
        }
        if (name == 'probation_Duration_To' && value < obj.probation_Duration_From) {
            setobj((prev) => ({
                ...prev,
                probation_Duration_To: obj.probation_Duration_From
            }))
            return
        }
        setobj((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const [Department_List, set_Department_List] = useState([]);
    const [Desgination_List, set_Desgination_List] = useState([]);
    let Add_Employee = (e) => {
        console.log({
            applied_list_access: obj.applied_list_access ? "true" : 'false',
            screening_shedule_access: obj.screening_shedule_access ? "true" : 'false',
            interview_shedule_access: obj.interview_schedule_access ? "true" : 'false',
            final_status_access: obj.final_status_access ? "true" : 'false',
        });
        setloading(true)
        axios.post(`${port}root/ems/NewEmployeesAdding/`, {
            ...obj,
            applied_list_access: obj.applied_list_access ? "true" : 'false',
            screening_shedule_access: obj.screening_shedule_access ? "true" : 'false',
            interview_shedule_access: obj.interview_schedule_access ? "true" : 'false',
            final_status_access: obj.final_status_access ? "true" : 'false',
        }).then((r) => {
            toast.success('Employee Added')
            console.log("NewEmployeesAdding_res.", r.data)
            getEmp()
            setshow(false)
            setloading(false)
        })
            .catch((err) => {
                toast.error('Employee Adding Failed.')
                console.log("NewEmployeesAdding_err", err)
                setloading(false)
            })
    }

    let getDesignation = () => {
        axios.get(`${port}root/ems/Departments/`)
            .then((r) => {
                set_Department_List(r.data)
                console.log("Departments_List_Res", r.data)
            })
            .catch((err) => {
                console.log("Departments_List_err", err)
            })
    }
    let Call_Department = (e) => {
        axios.get(`${port}/root/ems/Designation/${e}/`)
            .then((r) => {
                set_Desgination_List(r.data)
                console.log("Designation_List_Res", r.data)
            })
            .catch((err) => {
                console.log("Designation_List_err", err)
            })
    }
    const [interviewers, setInterviewers] = useState([]);

    useEffect(() => {
        axios.get(`${port}/root/interviewschedule`).then((e) => {
            console.log("Interviewer Data", e.data);
            setInterviewers(e.data)
        })
        // sentparticularData()
    }, [])
    useEffect(() => {
        getDesignation()
    }, [])

    return (
        <div>
            <Modal className=' ' centered size='xl' show={show} onHide={() => setshow(false)} >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <form>
                        {/* Form start */}
                        <div className="row justify-content-center m-0">
                            <h3 className='mt-2 text-center p-3' style={{ color: 'rgb(76,53,117)' }}>Enter Employee Information</h3>
                            <div className="col-lg-12 p-4 mt-2 border rounded-lg">
                                <form >
                                    {/* ---------------------------------PERSONAL DETAILS--------------------------------------------------------- */}
                                    <div className="row m-0  pb-2">
                                        <div className='row m-0 mt-2'>

                                            <div className="col-md-6 col-lg-4  mb-3">
                                                <label htmlFor="firstName" className="form-label">Name <span class='text-danger'>*</span> </label>
                                                <input type="text" className="form-control shadow-none bg-light" id="FirstName"
                                                    name="full_name"
                                                    value={obj.full_name}
                                                    onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="lastName" className="form-label">DOB <span class='text-danger'>*</span> </label>
                                                <input type="date" className="form-control shadow-none bg-light" id=" LastName"
                                                    name="date_of_birth"
                                                    value={obj.date_of_birth} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label bg-light"> Gender
                                                    <span class='text-danger'>*</span> </label>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="gender"
                                                    value={obj.gender} // Set the value of the select input to gender
                                                    onChange={handleChange} // Update gender state when the select input changes
                                                    required>
                                                    <option value="">Select Gender <span class='text-danger'>*</span>
                                                    </option> {/* Empty value for the default option */}
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="others">Others</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="email" className="form-label">Email <span class='text-danger'>*</span> </label>
                                                <input type="email" className="form-control shadow-none bg-light" id=" Email"
                                                    name="email"
                                                    value={obj.email} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="primaryContact" className="form-label">Phone <span class='text-danger'>*</span> </label>
                                                <input type="number" className="form-control shadow-none bg-light" id="PrimaryContact" name="mobile"
                                                    value={obj.mobile} onChange={(e) => {
                                                        if (e.target.value <= 0) {
                                                            setobj((prev) => ({
                                                                ...prev,
                                                                mobile: ''
                                                            }))
                                                        }
                                                        else if (e.target.value.length > 10) {
                                                            setobj((prev) => ({
                                                                ...prev,
                                                                mobile: prev.mobile
                                                            }))
                                                        }
                                                        else {
                                                            handleChange(e)
                                                        }
                                                    }} required />
                                            </div>
                                            <div className="col-md-6 col-lg-2 mb-3">
                                                <label htmlFor="secondaryContact" className="form-label">Weight  </label>
                                                <input type="number" className="form-control shadow-none bg-light" id="SecondaryContact" name="weight"
                                                    value={obj.weight} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6 col-lg-2 mb-3">
                                                <label htmlFor="secondaryContact" className="form-label">Height <span class='text-danger'>*</span> </label>
                                                <input type="number" className="form-control shadow-none bg-light" id="State" name="height"
                                                    value={obj.height} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6 col-lg-12 mb-3">
                                                <label htmlFor="secondaryContact" className="form-label">Permanent Address <span class='text-danger'>*</span> </label>
                                                <textarea type="text" className="form-control shadow-none bg-light" id=" District" name="permanent_address"
                                                    value={obj.permanent_address} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6 col-lg-12 mb-3">
                                                <label htmlFor="secondaryContact" className="form-label">Present Address  <span class='text-danger'>*</span> </label>
                                                <textarea type="text" className="form-control shadow-none bg-light" id=" District" name="present_address"
                                                    value={obj.present_address} onChange={handleChange} required />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="secondaryContact" className="form-label">Hired Date <span class='text-danger'>*</span> </label>
                                                <input type="date" className="form-control shadow-none bg-light" id="State" name="hired_date"
                                                    value={obj.hired_date} onChange={handleChange} required />
                                            </div>

                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label">Position <span class='text-danger'>*</span> </label>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="Dasboard_Dig"
                                                    value={obj.Dasboard_Dig} // Set the value of the select input to gender
                                                    onChange={handleChange} // Update gender state when the select input changes
                                                    required>
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    <option value="HR">HR head</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Employee">Employee</option>
                                                    <option value="Recruiter">Recruiter</option>
                                                </select>
                                            </div>
                                            {createDepartmentModal && <CreateDepartment getdept={getDesignation} setshow={setCreateDepartmentModal} show={createDepartmentModal} />}

                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <div className='flex justify-between items-center'>
                                                    <label htmlFor="gender" className="form-label ">Department <span class='text-danger'>*</span> </label>
                                                    <button type='button' onClick={() => setCreateDepartmentModal(true)} className='text-xs'>Create Department </button>
                                                </div> <select
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="Department"
                                                    value={obj.Department} // Set the value of the select input to gender
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        Call_Department(e.target.value)
                                                    }} // Update gender state when the select input changes
                                                    required>
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}


                                                    {Department_List.map(interviewer => (
                                                        <option key={interviewer.id} value={interviewer.id}>
                                                            {`${interviewer.Dep_Name}`}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {createDesignation && <CreateDesignation show={createDesignation} setshow={setCreatedesignation} />}

                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <div className='flex justify-between'>
                                                    <label htmlFor="gender" className="form-label ">Designation <span class='text-danger'>*</span>
                                                    </label>
                                                    <button onClick={() => setCreatedesignation(true)} className='text-xs '>create Designation </button>

                                                </div>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="Designation"
                                                    value={obj.Designation} // Set the value of the select input to gender
                                                    onChange={handleChange} // Update gender state when the select input changes
                                                    required>
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    {Desgination_List.map(interviewer => (
                                                        <option key={interviewer.id} value={interviewer.id}>
                                                            {`${interviewer.Name}`}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label">Reporting To <span class='text-danger'>*</span> </label>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="reporting_to"
                                                    value={obj.reporting_to} // Set the value of the select input to gender
                                                    onChange={handleChange} // Update gender state when the select input changes
                                                    required>
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    {interviewers.map(interviewer => (
                                                        <option key={interviewer.EmployeeId} value={interviewer.EmployeeId}>
                                                            {`${interviewer.EmployeeId},${interviewer.Name}`}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label">Employeement type <span class='text-danger'>*</span> </label>
                                                <select value={obj.Employeement_Type} onChange={handleChange}
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="Employeement_Type" // Update gender state when the select input changes
                                                    required>
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    <option value="intern">Intern </option>
                                                    <option value="permanent">Permanent </option>
                                                </select>
                                            </div>
                                            {obj.Employeement_Type == 'intern' && <section className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label">Intern Duration <span class='text-danger'>*</span> </label>
                                                <div>
                                                    <input type="date" value={obj.internship_Duration_From} name='internship_Duration_From'
                                                        onChange={handleChange} className='outline-none p-2 bg-light rounded border-1 ' /> -
                                                    <input type="date" value={obj.internship_Duration_To} name='internship_Duration_To'
                                                        onChange={handleChange} className='outline-none p-2 bg-light rounded border-1 ' />
                                                </div>
                                            </section>}
                                            {obj.Employeement_Type == 'permanent' && <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label">Probation type <span class='text-danger'>*</span> </label>
                                                <select value={obj.probation_status} onChange={handleChange}
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="probation_status"
                                                    // Update gender state when the select input changes
                                                    required>
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    <option value="probationer">Probationer </option>
                                                    {/* <option value="confirmed"> Confirmed </option> */}
                                                </select>
                                            </div>}
                                            {obj.probation_status == 'probationer' && <section className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label">Probation Duration <span class='text-danger'>*</span> </label>
                                                <div>
                                                    <input type="date" value={obj.probation_Duration_From} name='probation_Duration_From'
                                                        onChange={handleChange} className='outline-none p-2 bg-light rounded border-1 ' /> -
                                                    <input type="date" value={obj.probation_Duration_To} name='probation_Duration_To'
                                                        onChange={handleChange} className='outline-none p-2 bg-light rounded border-1 ' />
                                                </div>
                                            </section>}
                                        </div>
                                    </div>
                                    {obj.Dasboard_Dig != 'Admin' && obj.Dasboard_Dig != 'HR' && <section>
                                        <h4>Permissions </h4>
                                        <article className='flex flex-wrap'>
                                            <div className='w-fit cursor-pointer col-md-6 col-lg-4 mb-3 '>
                                                <input onChange={() => {
                                                    setobj((prev) => ({
                                                        ...prev,
                                                        interview_schedule_access: !prev.interview_schedule_access
                                                    }))
                                                }}
                                                    value={obj.interview_schedule_access} checked={obj.interview_schedule_access}
                                                    type="checkbox" id='AssignInterview' />
                                                <label className='mx-2 cursor-pointer' htmlFor="AssignInterview"> Assign Interview </label>
                                            </div>
                                            <div className='w-fit cursor-pointer col-md-6 col-lg-4 mb-3 '>
                                                <input onChange={() => {
                                                    setobj((prev) => ({
                                                        ...prev,
                                                        screening_shedule_access: !prev.screening_shedule_access
                                                    }))
                                                }}
                                                    value={obj.screening_shedule_access} checked={obj.screening_shedule_access} type="checkbox" id='AssignScreening' />
                                                <label className='mx-2 cursor-pointer' htmlFor="AssignScreening"> Assign Screening </label>
                                            </div>
                                            <div className='w-fit cursor-pointer col-md-6 col-lg-4 mb-3 '>
                                                <input onChange={() => {
                                                    setobj((prev) => ({
                                                        ...prev,
                                                        applied_list_access: !prev.applied_list_access
                                                    }))
                                                }}
                                                    value={obj.applied_list_access} checked={obj.applied_list_access} type="checkbox"
                                                    id='applied' />
                                                <label className='mx-2 cursor-pointer' htmlFor="applied">Applied list access  </label>
                                            </div>
                                            <div className='w-fit cursor-pointer col-md-6 col-lg-4 mb-3 '>
                                                <input onChange={() => {
                                                    setobj((prev) => ({
                                                        ...prev,
                                                        final_status_access: !prev.final_status_access
                                                    }))
                                                }}
                                                    value={obj.final_status_access} checked={obj.final_status_access} type="checkbox" id='finalstatus' />
                                                <label className='mx-2 cursor-pointer' htmlFor="finalstatus">Final status access </label>
                                            </div>
                                        </article>

                                    </section>}

                                    <div className="col-12 text-end mt-3">
                                        <button type="button" disabled={loading} onClick={Add_Employee}
                                            //  data-bs-dismiss="modal"  
                                            className="btn btn-primary text-white fw-medium px-2 px-lg-5">
                                            {loading ? "Loading.." : "Submit"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* form end */}

                    </form>


                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EmployeeCreation