import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { port } from '../App'
import Topnav from '../Components/Topnav'
import HrmContext, { HrmStore } from '../Context/HrmContext'

const EmployeeProfile = () => {
    let { id } = useParams()
    let { formatDate } = useContext(HrmStore)
    let [employeeDetails, setEmployeeDetails] = useState()
    let getEmployee = () => {
        if (id) {
            axios.get(`${port}/root/ems/EmployeeProfile/${id}/`).then((response) => {
                console.log(response.data);
                setEmployeeDetails(response.data)
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    useEffect(() => {
        getEmployee()
    }, [id])
    return (
        <div>
            <Topnav name={employeeDetails && employeeDetails.EmployeeInformation.full_name} />
            <main className='row container-fluid poppins '>
                {employeeDetails && employeeDetails.EmployeeInformation &&
                    <section className='col-lg-6 p-2  min-h-[40vh] '>
                        <article className='rounded-lg bgclr h-full gap-3 items-center p-3 w-full flex '>

                            <img className='w-[30%] rounded-full  '
                                src={employeeDetails.EmployeeInformation.EmployeeProfile
                                    ? employeeDetails.EmployeeInformation.EmployeeProfile : require('../assets/Images/profile_Image.webp')}
                                alt="Profile image" />
                            <div>
                                <h4 >{employeeDetails.EmployeeInformation.full_name} </h4>
                                <p className='text-break ' >Position : <span>{employeeDetails.EmployeeInformation.Position} </span> </p>
                                <p className='text-break ' >Email : <span>{employeeDetails.EmployeeInformation.email} </span> </p>
                                <p className='text-break ' >Phone : <span>{employeeDetails.EmployeeInformation.mobile} </span> </p>
                                <p className='text-break ' >DOB : <span>{formatDate(employeeDetails.EmployeeInformation.date_of_birth)} </span> </p>



                            </div>



                        </article>
                    </section>}
                <section className='col-lg-6 p-2  min-h-[40vh] '>
                    <article className='rounded-lg bgclr p-3 h-full w-full '>

                    </article>
                </section>
                {/* INformation */}
                <section className='col-lg-6 p-2  min-h-[40vh] '>
                    <article className='rounded-lg bgclr p-3 h-full w-full '>
                        <h5>Basic Information : </h5>
                        <div className='text-sm flex  justify-between flex-wrap  '>
                            <p> Hire Date : <span className='bg-white rounded-lg p-[3px] text-xs shadow ' >
                                {employeeDetails && employeeDetails.EmployeeInformation
                                    && formatDate(employeeDetails.EmployeeInformation.hired_date)} </span> </p>
                            <p> Employee ID : <span className='bg-white rounded-lg p-[3px] text-xs shadow '>
                                {employeeDetails && employeeDetails.EmployeeInformation
                                    && employeeDetails.EmployeeInformation.employee_Id} </span> </p>

                        </div>
                        <h5>Personal Information : </h5>
                        <p>Address : </p>
                        {employeeDetails && employeeDetails.EmployeeInformation &&
                            <div className='my-2 p-3 rounded bg-white w-full min-h-[40%]  '>
                                {employeeDetails.EmployeeInformation.present_address } <br />
                                {employeeDetails.EmployeeInformation.present_City } <br />
                                {employeeDetails.EmployeeInformation.present_state } -
                                {employeeDetails.EmployeeInformation.present_pincode }


                            </div>}

                    </article>
                </section>
                <section className='col-lg-6 p-2  min-h-[40vh] '>
                    <article className='rounded-lg p-3 bgclr h-full w-full '>

                    </article>
                </section>

            </main>

        </div>
    )
}

export default EmployeeProfile