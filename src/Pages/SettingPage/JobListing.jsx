import React, { useContext, useEffect, useState } from 'react'
import { HrmStore } from '../../Context/HrmContext'
import axios from 'axios'
import { meridahrport, port } from '../../App'
import { useNavigate } from 'react-router-dom'

const JobListing = () => {
    let { setActiveSetting, getProperDate } = useContext(HrmStore)
    let navigate = useNavigate()
    let [allJobs, setAllJobs] = useState()
    useEffect(() => {
        setActiveSetting('jobposting')
        getAllJobs()
    }, [])
    let getAllJobs = () => {
        axios.get(`${meridahrport}/api/job_description/`).then((response) => {
            console.log(response.data, 'jobs');
            setAllJobs(response.data)
        }).catch((error) => {
            console.log(error, 'jobs');
        })
    }
    return (
        <div>
            <section className='flex items-center justify-between ' >
                <h6> All Jobs Listed in our Website </h6>
                <button onClick={()=>navigate('/settings/jobpost')} className='bg-blue-600 text-white p-2 rounded ' >
                    Post Job 
                </button>
            </section>
            <main className='tablebg table-responsive rounded my-3 ' >
                <table className='w-full ' >
                    <tr>
                        <th>SI No </th>
                        <th>Job Title </th>
                        <th>Qualification </th>
                        <th>Department </th>
                        <th> Experience </th>
                        <th> Package  </th>
                        <th> Office Location  </th>
                    </tr>
                    {
                        allJobs && allJobs.map((obj, index) => (
                            <tr onClick={() => navigate(`/settings/jobposting/${obj.id}`)} className={`hover:bg-slate-200 cursor-pointer  `} >
                                <td>{index + 1} </td>
                                <td>{obj.Title} </td>
                                <td>{obj.Qualification} </td>
                                <td> {obj.department_name} </td>
                                <td>
                                    {obj.min_exp && (obj.min_exp) + "yrs"}
                                    {obj.min_exp && obj.Experience && " - "}
                                    {obj.Experience && (obj.Experience) + "yrs "} </td>
                                <td>
                                    {obj.min_salary && (obj.min_salary) + obj.salary_type}
                                    {obj.min_salary && obj.max_salary && " - "}
                                    {obj.max_salary && (obj.max_salary) + obj.salary_type}
                                </td>
                                <td> {obj.job_location} </td>
                            </tr>
                        ))
                    }
                </table>
            </main>

        </div>
    )
}

export default JobListing