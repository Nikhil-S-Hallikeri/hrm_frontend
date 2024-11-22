import React, { useContext, useEffect, useState } from 'react'
import { HrmStore } from '../../Context/HrmContext'
import InputFieldform from '../../Components/SettingComponent/InputFieldform'
import axios from 'axios'
import { meridahrport, port } from '../../App'
import PlusIcon from '../../SVG/PlusIcon'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const JobPosting = () => {
    let { id } = useParams()
    let { setTopNav, getProperDate } = useContext(HrmStore)
    let [otherDesignation, setOtherDesignation] = useState()
    let navigate = useNavigate()
    let [allDepartment, setallDepartment] = useState()
    let [designation, setdesignation] = useState()
    let [loading, setLoading] = useState(false)
    let [formObj, setFormObj] = useState({
        Experience: 0,
        Job_Discription: "",
        Qualification: "",
        role: "",
        Title: "",
        company_inrto: "",
        department_id: 0,
        department_name: "",
        designation_id: 0,
        designation_name: "",
        job_location: "",
        job_type: "",
        max_salary: "",
        min_exp: 0,
        min_salary: "",
        points: [{
            point: ''
        }],
        key_skills: [{
            skill: '',
            is_required: false
        }],
        expertise_points: [
            {
                point: ''
            }
        ],
        salary_type: "LPA",
    })
    let handleFormObj = (e) => {
        let { value, name } = e.target
        setFormObj((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        setTopNav('jobposting')
        getDepartment()
        if (id)
            getParticularJob()
    }, [id])
    useEffect(() => {
        if (formObj.department_id) {
            getDesignation(formObj.department_id)
        }
    }, [formObj.department_id])
    let getDepartment = () => {
        axios.get(`${port}root/ems/Departments/`)
            .then((r) => {
                setallDepartment(r.data)
                console.log("Departments_List_Res", r.data)
            })
            .catch((err) => {
                console.log("Departments_List_err", err)
            })
    }
    let getParticularJob = () => {
        axios.get(`${meridahrport}/api/job_description/${id}/`).then((response) => {
            console.log(response.data, 'partjob');
            setFormObj(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }
    let updateJobPosting = async () => {
        setLoading("update")
        if (id)
            await axios.patch(`${meridahrport}/api/job_description/${id}/`, formObj).then((response) => {
                console.log(response.data);
                toast.success('Updated Successfully')
            }).catch((error) => {
                console.log(error);
                toast.error('Error occured')
            })
        setLoading(false)
    }

    let deleteJobPosting = () => {
        setLoading("delete")
        axios.delete(`${meridahrport}/api/job_description/${id}/`).then((response) => {
            toast.success('Job Post is removed')
            navigate(`/settings/jobposting`)
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
            toast.error('Error acquired')
        })
    }

    let getDesignation = (id) => {
        axios.get(`${port}/root/ems/Designation/${id}/`)
            .then((r) => {
                setdesignation(r.data)
                console.log("Designation_List_Res", r.data)
            })
            .catch((err) => {
                console.log("Designation_List_err", err)
            })
    }
    let reset = () => {
        setFormObj({
            Experience: 0,
            Job_Discription: "",
            Qualification: "",
            role: "",
            Title: "",
            company_inrto: "",
            department_id: 0,
            department_name: "",
            designation_id: 0,
            designation_name: "",
            job_location: "",
            job_type: "",
            max_salary: "",
            min_exp: 0,
            min_salary: "",
            points: [{
                point: ''
            }],
            key_skills: [{
                skill: '',
                is_required: false
            }],
            expertise_points: [
                {
                    point: ''
                }
            ],
            salary_type: "LPA",
        })
    }
    let postJob = () => {

        setLoading(true)
        axios.post(`${meridahrport}/api/job_description/`, formObj).then((response) => {
            toast.success('Posted Successfully')
            setLoading(false)
            reset()
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            setLoading(false)
            toast.error('Error occured')
        })
    }
    return (
        <div>
            <h5> Job Posting </h5>
            <main className='formbg rounded p-3 my-3 row' >
                {/* Department */}
                <div className='"col-md-6 col-lg-4 ' >
                    <label htmlFor="">Department :  </label>
                    <select name="" id=" " value={formObj.department_id}
                        onChange={(e) => {
                            getDesignation(e.target.value)
                            let getName = allDepartment.find((obj, index) => obj.id == e.target.value) && allDepartment.find((obj, index) => obj.id == e.target.value).Dep_Name
                            setFormObj((prev) => ({
                                ...prev,
                                department_id: e.target.value,
                                department_name: getName
                            }))
                        }}
                        className='outline-none w-full my-2 p-2 rounded block bgclr ' >
                        <option value="">Select </option>
                        {allDepartment && allDepartment.map((obj, index) => (
                            <option value={obj.id}>{obj.Dep_Name} </option>
                        ))}
                    </select>
                </div>
                {/* designation */}
                <div className=' col-md-6 col-lg-4 ' >
                    <label htmlFor="">Job Designation :  </label>
                    <select name="" id=" " value={formObj.designation_id}
                        onChange={(e) => {
                            if (e.target.value == 'other') {
                                setFormObj((prev) => ({
                                    ...prev,
                                    designation_name: 'other',
                                    Title: ""
                                }))
                            }
                            else {
                                let designationName = designation.find((obj, index) => obj.id == e.target.value).Name
                                setFormObj((prev) => ({
                                    ...prev,
                                    designation_id: e.target.value,
                                    designation_name: designationName,
                                    Title: designationName
                                }))
                            }
                        }}
                        className='outline-none w-full my-2 p-2 rounded block bgclr ' >
                        <option value="">Select </option>
                        {designation && designation.map((obj, index) => (
                            <option value={obj.id}>{obj.Name} </option>
                        ))}
                        <option value="other">Others</option>
                    </select>
                </div>

                <InputFieldform disabled={formObj.designation_name != 'other'} value={formObj.Title} name='Title' handleChange={handleFormObj} type='text'
                    label='Job Title' placeholder='Enter the Title' />
                <InputFieldform name='role' handleChange={handleFormObj} type='text' label='Job Role' value={formObj.role} />

                <InputFieldform name='Qualification' handleChange={handleFormObj} type='text' label='Qualification' value={formObj.Qualification} />

                {/* Company */}
                <InputFieldform name='company_inrto' handleChange={handleFormObj} type='text' label='Company Name' value={formObj.company_inrto} />
                {/* Location job_location */}
                <InputFieldform name='job_location' handleChange={handleFormObj} label='Company location :' value={formObj.job_location} />
                {/* Employeement type */}
                <InputFieldform label='Employeement type' handleChange={handleFormObj} value={formObj.job_type} name='job_type'
                    placeholder='Full Time' />
                {/* Experience */}
                <section className=' col-md-6 col-lg-4 ' >
                    <label htmlFor=""> Experience </label>
                    <article className='flex flex-wrap justify-between items-center' >
                        <div className=' '>
                            <label htmlFor="">max</label>
                            <input type="number" className='outline-none p-1 block rounded bgclr w-20 ' value={formObj.Experience}
                                onChange={handleFormObj} name='Experience' />
                        </div>
                        <span> - </span>
                        <div className=' '>
                            <label htmlFor="">min</label>
                            <input type="number" className='outline-none p-1 block rounded bgclr w-20 ' value={formObj.min_exp}
                                onChange={handleFormObj} name='min_exp' />
                        </div>
                    </article>
                </section>
                {/* Package */}
                <section className=' col-md-6 col-lg-4 ' >
                    <label htmlFor=""> Package </label>
                    <article className='flex flex-wrap justify-between items-center' >
                        <div className=' '>
                            <label htmlFor="">max</label>
                            <input type="number" className='outline-none p-1 block rounded bgclr w-20 ' value={formObj.max_salary}
                                onChange={handleFormObj} name='max_salary' />
                        </div>
                        <div className=' '>
                            <label htmlFor="">min</label>
                            <input type="number" className='outline-none p-1 block rounded bgclr w-20 ' value={formObj.min_salary}
                                onChange={handleFormObj} name='min_salary' />
                        </div>
                        <div className=' '>
                            <label htmlFor="">Type</label>
                            <select type="number" className='outline-none p-1 block rounded bgclr w-20 ' value={formObj.salary_type}
                                onChange={handleFormObj} name='salary_type' >
                                <option value="LPA">LPA</option>
                                <option value="K">K</option>
                            </select>
                        </div>
                    </article>
                </section>

                {/* Responsible roles */}
                <section className='  col-md-6 col-lg-4 '>
                    <div className='flex justify-between items-center ' >
                        <label htmlFor="">Job Responsibles </label>
                        <button onClick={() => {
                            let newpoints = [...formObj.points, { point: '' }]
                            setFormObj((prev) => ({
                                ...prev,
                                points: newpoints
                            }))
                        }} className='rounded-full p-1 border-2 
                         border-slate-200  ' > <PlusIcon /> </button>
                    </div>
                    {/* Point listing */}
                    <div>
                        {
                            formObj && formObj.points && formObj.points.map((obj, index) => (
                                <div className='flex gap-2 justify-between items-center ' >
                                    <input type="text" value={obj.point} onChange={(e) => {
                                        let arry = [...formObj.points]
                                        arry[index].point = e.target.value
                                        setFormObj((prev) => ({
                                            ...prev,
                                            points: arry
                                        }))
                                    }} className='p-2 bgclr w-full rounded my-2 outline-none ' />
                                    {index > 0 && <button onClick={() => {
                                        let arry = [...formObj.points].filter((val, index2) => index != index2)
                                        setFormObj((prev) => ({
                                            ...prev,
                                            points: arry
                                        }))
                                    }} className='rotate-45 text-red-600 border-2 border-red-600 rounded-full ' >
                                        <PlusIcon />
                                    </button>}
                                </div>
                            ))
                        }

                    </div>
                </section>
                {/* Expertise points */}
                <section className='  col-md-6 col-lg-4 '>
                    <div className='flex justify-between items-center ' >
                        <label htmlFor="">Expertise </label>
                        <button onClick={() => {
                            let newpoints = [...formObj.expertise_points, { point: '' }]
                            setFormObj((prev) => ({
                                ...prev,
                                expertise_points: newpoints
                            }))
                        }} className='rounded-full p-1 border-2 
                         border-slate-200  ' > <PlusIcon /> </button>
                    </div>
                    {/* Point listing */}
                    <div>
                        {
                            formObj && formObj.expertise_points && formObj.expertise_points.map((obj, index) => (
                                <div className='flex gap-2 justify-between items-center ' >
                                    <input type="text" value={obj.point} onChange={(e) => {
                                        let arry = [...formObj.expertise_points]
                                        arry[index].point = e.target.value
                                        setFormObj((prev) => ({
                                            ...prev,
                                            expertise_points: arry
                                        }))
                                    }} className='p-2 bgclr w-full rounded my-2 outline-none ' />
                                    {index > 0 && <button onClick={() => {
                                        let arry = [...formObj.expertise_points].filter((val, index2) => index != index2)
                                        setFormObj((prev) => ({
                                            ...prev,
                                            expertise_points: arry
                                        }))
                                    }} className='rotate-45 text-red-600 border-2 border-red-600 rounded-full ' >
                                        <PlusIcon />
                                    </button>}
                                </div>
                            ))
                        }

                    </div>
                </section>
                {/* Key skills */}
                <section className='  col-md-6 col-lg-4 '>
                    <div className='flex justify-between items-center ' >
                        <label htmlFor="">Key Skills </label>
                        <button onClick={() => {
                            let newpoints = [...formObj.key_skills, { skill: '', is_required: false }]
                            setFormObj((prev) => ({
                                ...prev,
                                key_skills: newpoints
                            }))
                        }} className='rounded-full p-1 border-2 
                         border-slate-200  ' > <PlusIcon /> </button>
                    </div>
                    {/* Point listing */}
                    <div>
                        {
                            formObj && formObj.key_skills && formObj.key_skills.map((obj, index) => (
                                <div className='flex gap-2 justify-between items-center ' >

                                    <div className='p-2 bgclr w-full rounded my-2 flex items-center' >

                                        <input type="text" value={obj.skill} onChange={(e) => {
                                            let arry = [...formObj.key_skills]
                                            arry[index].skill = e.target.value
                                            setFormObj((prev) => ({
                                                ...prev,
                                                key_skills: arry
                                            }))
                                        }} className='w-full outline-none bg-transparent ' />
                                        {/* Check button */}
                                        <input type="radio" checked={obj.is_required} onClick={(e) => {
                                            let arry = [...formObj.key_skills]
                                            arry[index].is_required = !arry[index].is_required
                                            setFormObj((prev) => ({
                                                ...prev,
                                                key_skills: arry
                                            }))
                                        }} />

                                    </div>
                                    {index > 0 && <button onClick={() => {
                                        let arry = [...formObj.key_skills].filter((val, index2) => index != index2)
                                        setFormObj((prev) => ({
                                            ...prev,
                                            key_skills: arry
                                        }))
                                    }} className='rotate-45 text-red-600 border-2 border-red-600 rounded-full ' >
                                        <PlusIcon />
                                    </button>}
                                </div>
                            ))
                        }

                    </div>
                </section>
                {/* Description */}
                <InputFieldform label='Job Description' type='textarea' handleChange={handleFormObj}
                    name='Job_Discription' value={formObj.Job_Discription} />
                <div className='col-12 flex ' >

                    {!id && <button onClick={postJob} disabled={loading} className='ms-auto p-2 bg-green-500 text-white rounded ' >
                        {loading ? 'Loading...' : "Post Job"}
                    </button>}
                    {id && <>

                        <button onClick={updateJobPosting} disabled={loading == 'update'} className='ms-auto p-2 bg-blue-500 text-white rounded ' >
                            {loading == 'update' ? 'Loading...' : "Update Posted Job"}
                        </button>
                        <button disabled={loading == 'delete'} className='p-2 bg-red-500 text-white  rounded mx-2 '
                            onClick={deleteJobPosting} >
                            {loading == 'delete' ? "Loading..." : "Delete"}
                        </button>

                    </>
                    }

                </div>

            </main>

        </div>
    )
}

export default JobPosting