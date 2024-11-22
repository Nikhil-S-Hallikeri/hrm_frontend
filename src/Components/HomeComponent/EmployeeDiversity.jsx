import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import { port } from '../../App';

const EmployeeDiversity = ({ type }) => {
    let [diversityData, setDiversityData] = useState({
        Male: null,
        Female: null,
        Transgender: null,
        Other: null
    })
    let [candidateDiversity, setCandidateDiversity] = useState({

    })
    const data = {
        labels: [
            'Men',
            'Female',
            'Transgender',
            'Others'
        ],
        datasets: [{
            label: 'EmployeeDiversity',
            data: [diversityData.Male, diversityData.Female, diversityData.Transgender, diversityData.Other],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(0, 0,0)'
            ],
            hoverOffset: 4,
        },
        ]
    };
    let [departmentData, setDepartmentData] = useState({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
        }]
    })
    let [jobPortalData, setJobPortalData] = useState({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
        }]
    })
    let getdiversity = () => {
        axios.get(`${port}/root/employee-diversity/`).then((response) => {
            console.log(response.data, 'diversity');
            setDiversityData(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }
    let getJobPortData = () => {
        axios.get(`${port}/root/job-portal-source-count/`).then((response) => {
            console.log(response.data, 'diversity-job');
            setJobPortalData((prev) => ({
                ...prev,
                labels: response.data.map((obj) => obj.JobPortalSource),
                datasets: [{
                    label: "",
                    backgroundColor: ['rgb(153, 102, 255)'],
                    data: response.data.map((obj) => obj.count),
                }],
            }))

        }).catch((error) => {
            console.log(error);
        })
    }
    let getDepratment = () => {
        axios.get(`${port}/root/department-ratio/`).then((response) => {
            console.log(response.data, 'diversity-dep');
            console.log(Object.keys(response.data), 'diversity');
            setDepartmentData((prev) => ({
                ...prev,
                labels: Object.keys(response.data),
                datasets: [{
                    label: "",
                    backgroundColor: ['rgba(54, 162, 235,0.9)'],
                    data: Object.values(response.data),

                }],
            }))
        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getdiversity()
        getDepratment()
        getJobPortData()
    }, [])
    return (
        <>
            {
                type == 'candidate' ?
                    <div className='bgclr rounded p-3 ' >
                        <h5 className=' poppins fw-semibold text-blue-900  ' >Employee Gender Diversity </h5>
                        <section className='sm:w-[24rem] h-[40vh] mx-auto ' >

                            {diversityData && <Pie data={data} />}
                        </section>
                    </div> : type == 'portal' ?
                        <div className='bgclr rounded p-3 ' >
                            <h5 className=' poppins fw-semibold text-blue-900  ' >Job Portal  Ratio </h5>
                            <section className=' mx-auto h-[40vh] overflow-x-scroll ' >

                                {jobPortalData && <Bar data={jobPortalData} />}
                            </section>
                        </div> :

                        <div className='bgclr rounded p-3 ' >
                            <h5 className=' poppins fw-semibold text-blue-900  ' >Department Ratio </h5>
                            <section className=' mx-auto h-[40vh] overflow-x-scroll ' >

                                {departmentData && <Bar data={departmentData} />}
                            </section>
                        </div>
            }
        </>
    )
}

export default EmployeeDiversity