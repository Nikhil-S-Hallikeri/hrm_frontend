import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { port } from '../App'
import Topnav from '../Components/Topnav'
import HrmContext, { HrmStore } from '../Context/HrmContext'
import EditPen from '../SVG/EditPen'
import ValueShowingCom from '../Components/ValueShowingCom'
import AutoTable from '../Components/Tables/AutoTable'

const EmployeeProfile = () => {
    let { id } = useParams()
    let { setActivePage } = useContext(HrmStore)
    let { formatDate } = useContext(HrmStore)
    let [employeeDetails, setEmployeeDetails] = useState()
    let getEmployee = () => {
        axios.get(`${port}/root/ems/EmployeeProfile/${id ? id : JSON.parse(sessionStorage.getItem('dasid'))}/`).then((response) => {
            console.log(response.data, 'emp');
            setEmployeeDetails(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getEmployee()
        setActivePage('Employee')
    }, [id])
    let navigate = useNavigate()
    return (
        <div>
            <Topnav name={employeeDetails && employeeDetails.EmployeeInformation && employeeDetails.EmployeeInformation.full_name} />
            <main className='row container-fluid poppins '>
                {employeeDetails && employeeDetails.EmployeeInformation &&
                    <section className='col-lg-6 p-2 my-2 min-h-[40vh] '>
                        <article className='rounded-lg bgclr min-h-[40vh] gap-3 items-center p-3 w-full flex '>

                            <img className='w-[10rem] h-[10rem] object-cover rounded-full  '
                                src={employeeDetails.EmployeeInformation.EmployeeProfile
                                    ? employeeDetails.EmployeeInformation.EmployeeProfile : require('../assets/Images/profile_Image.webp')}
                                alt="Profile image" />
                            <div className='relative ' >
                                <button onClick={() => navigate(`/Employeeallform/${employeeDetails.EmployeeInformation.employee_Id}`)}
                                    className='relative ms-auto flex  ' >
                                    <EditPen />
                                </button>
                                <h4 >{employeeDetails.EmployeeInformation.full_name} </h4>
                                <p className='text-break ' >Position : <span>{employeeDetails.EmployeeInformation.Position} </span> </p>
                                <p className='text-break ' >Email : <span>{employeeDetails.EmployeeInformation.email} </span> </p>
                                <p className='text-break ' >Phone : <span>{employeeDetails.EmployeeInformation.mobile} </span> </p>
                                <p className='text-break ' >DOB : <span>{formatDate(employeeDetails.EmployeeInformation.date_of_birth)} </span> </p>
                            </div>

                        </article>
                    </section>}
                {/* Bank Details */}
                <section className='col-lg-6 p-2 h-[40vh] my-2 '>
                    <article className='rounded-lg bgclr p-3 pt-0 h-[40vh] overflow-y-scroll w-full '>
                        <h5 className='sticky top-0 bgclr1 pt-3 pb-2' > Bank Details </h5>
                        {
                            employeeDetails && employeeDetails.BankAccountDetails && employeeDetails.BankAccountDetails.map((obj, index) => (
                                <section>
                                    <ValueShowingCom name="Account Holder Name " value={obj.Holder_Name} />
                                    <ValueShowingCom name="Account Number " value={obj.account_no} />
                                    <ValueShowingCom name="IFSC Number " value={obj.ifsc} />
                                    <ValueShowingCom name="Bank Name " value={obj.bank_name} />
                                    <ValueShowingCom name="Branch " value={obj.branch} />
                                    <ValueShowingCom name="Branch Address " value={obj.branch_address} />
                                    <ValueShowingCom name="Proof " proof={obj.account_proof} />

                                    <hr />
                                </section>
                            ))
                        }
                    </article>
                </section>
                {/* Document submitted Details */}
                <section className='col-lg-6 p-2 h-[40vh] my-2 '>
                    <article className='rounded-lg bgclr p-3 pt-0 h-[40vh] overflow-y-scroll w-full '>
                        <h5 className='sticky top-0 bgclr1 pt-3 pb-2' > Document Submitted Details </h5>
                        {
                            employeeDetails && employeeDetails.Attachments
                            && employeeDetails.Attachments.map((obj, index) => (
                                <section>
                                    <ValueShowingCom name="Degree Mark Sheet " proof={obj.Degree_mark_sheets} />
                                    <ValueShowingCom name="Offer letter " proof={obj.Offer_letter_copy} />
                                    <ValueShowingCom name="Address Proof" proof={obj.permanent_address_proof} />
                                    <ValueShowingCom name="Passport size Photo " proof={obj.upload_photo} />
                                    <ValueShowingCom name="Present address proof " proof={obj.present_address_proof} />

                                    <hr />
                                </section>
                            ))
                        }
                    </article>
                </section>
                {/* INformation */}
                <section className='col-lg-6 p-2 my-2 min-h-[40vh] '>
                    <article className='rounded-lg bgclr min-h-[40vh] p-3 h-full w-full '>
                        <h5>Basic Information : </h5>
                        <div className='text-sm flex  justify-between flex-wrap  '>
                            <p> Hire Date : <span className='bg-white rounded-lg p-[3px] px-2 text-xs shadow ' >
                                {employeeDetails && employeeDetails.EmployeeInformation
                                    && formatDate(employeeDetails.EmployeeInformation.hired_date)} </span> </p>
                            <p> Employee ID : <span className='bg-white rounded-lg px-2 p-[3px] text-xs shadow '>
                                {employeeDetails && employeeDetails.EmployeeInformation
                                    && employeeDetails.EmployeeInformation.employee_Id} </span> </p>

                        </div>
                        <h5>Personal Information : </h5>
                        <p>Address : </p>
                        {employeeDetails && employeeDetails.EmployeeInformation &&
                            <div className='my-2 p-3 rounded bg-white w-full min-h-[40%]  '>
                                {employeeDetails.EmployeeInformation.present_address} <br />
                                {employeeDetails.EmployeeInformation.present_City} <br />
                                {employeeDetails.EmployeeInformation.present_state} -
                                {employeeDetails.EmployeeInformation.present_pincode}

                            </div>
                        }

                    </article>
                </section>
                {/* Personal INformation */}
                <section className='col-lg-6 p-2 h-[40vh] my-2 '>
                    <article className='rounded-lg bgclr p-3 pt-0 h-[40vh] overflow-y-scroll w-full '>
                        <h5 className='sticky top-0 bgclr1 pt-3 pb-2' > Personal Information </h5>
                        {
                            employeeDetails && employeeDetails.PersonalInformation && employeeDetails.PersonalInformation.map((obj, index) => (
                                <section>
                                    <ValueShowingCom name="Place of Birth " value={obj.place_of_birth} />
                                    <ValueShowingCom name="Residential " value={obj.residential_status} />

                                    <ValueShowingCom name="Physically challenged " value={obj.physically_challenged} />

                                    <ValueShowingCom name="Material Status " value={obj.marital_status} />
                                    <ValueShowingCom name="Spouse Name  " value={obj.spouse_name} />
                                    <ValueShowingCom name="Marriage Date" value={obj.marriage_date} />
                                    <ValueShowingCom name="Country of origin " value={obj.country_of_origin} />
                                    <ValueShowingCom name="Nationality " value={obj.nationality} />


                                    <hr />
                                </section>
                            ))
                        }
                    </article>
                </section>
                {/* Reference data */}
                <section className='col-lg-6 p-2 h-[40vh] my-2 '>
                    <article className='rounded-lg bgclr p-3 pt-0 h-[40vh] overflow-y-scroll w-full '>
                        <h5 className='sticky top-0 bgclr1 pt-3 pb-2' > Candidate Reference Detail </h5>
                        {
                            employeeDetails && employeeDetails.CandidateReferenceDetails && employeeDetails.CandidateReferenceDetails.map((obj, index) => (
                                <section>
                                    <ValueShowingCom name="Name " value={obj.person_name} />
                                    <ValueShowingCom name="Email " value={obj.email} />
                                    <ValueShowingCom name="Phone Number " value={obj.phone} />
                                    <ValueShowingCom name="Relationship " value={obj.relation} />
                                    {/* <ValueShowingCom name=" " value={obj.reason} /> */}
                                    {/* <ValueShowingCom name="Branch Address " value={obj.branch_address} /> */}
                                    <hr />
                                </section>
                            ))
                        }
                    </article>
                </section>
                {/* Reference data */}
                <section className='col-lg-6 p-2 h-[40vh] my-2 '>
                    <article className='rounded-lg bgclr p-3 pt-0 h-[40vh] overflow-y-scroll w-full '>
                        <h5 className='sticky top-0 bgclr1 pt-3 pb-2' > Educational Details </h5>
                        {
                            employeeDetails && employeeDetails.EducationDetails && employeeDetails.EducationDetails.map((obj, index) => (
                                <section>
                                    <ValueShowingCom name="Qualification " value={obj.Qualification} />
                                    <ValueShowingCom name="Major Subject " value={obj.Major_Subject} />
                                    <ValueShowingCom name="Percentage " value={obj.Persentage} />
                                    <ValueShowingCom name="Institute/School " value={obj.University} />
                                    {/* <ValueShowingCom name=" " value={obj.reason} /> */}
                                    <ValueShowingCom name="YOP" value={obj.year_of_passout} />
                                    <hr />
                                </section>
                            ))
                        }
                    </article>
                </section>
                {/* emergency Contact data */}
                <section className='col-lg-6 p-2 h-[40vh] my-2 '>
                    <article className='rounded-lg bgclr p-3 pt-0 h-[40vh] overflow-y-scroll w-full '>
                        <h5 className='sticky top-0 bgclr1 pt-3 pb-2' > Emergency Contact Details </h5>
                        {
                            employeeDetails && employeeDetails.EmergencyContactDetails && employeeDetails.EmergencyContactDetails.map((obj, index) => (
                                <section>
                                    <ValueShowingCom name="Name " value={obj.person_name} />
                                    <ValueShowingCom name="Email " value={obj.email} />
                                    <ValueShowingCom name="Phone Number " value={obj.phone} />
                                    <ValueShowingCom name="Landline " value={obj.landline} />
                                    <ValueShowingCom name="Relation " value={obj.relation} />
                                    <ValueShowingCom name="Address " value={obj.address} />
                                    <ValueShowingCom name="City " value={obj.city} />
                                    <ValueShowingCom name="State " value={obj.state} />
                                    <ValueShowingCom name="Pincode " value={obj.pincode} />
                                    <ValueShowingCom name="Country " value={obj.country} />
                                    <hr />
                                </section>
                            ))
                        }
                    </article>
                </section>
                {/* Medical data */}
                <section className='col-lg-6 p-2 h-[40vh] my-2 '>
                    <article className='rounded-lg bgclr p-3 pt-0 h-[40vh] overflow-y-scroll w-full '>
                        <h5 className='sticky top-0 bgclr1 pt-3 pb-2' > Medical Details </h5>
                        {
                            employeeDetails && employeeDetails.EmergencyDetails && employeeDetails.EmergencyDetails.map((obj, index) => (
                                <section>
                                    <ValueShowingCom name="Blood Group " value={obj.blood_group} />
                                    <ValueShowingCom name="Blood Pressure " value={obj.blood_pessure} />
                                    <ValueShowingCom name="Diabetics " value={obj.Diabetics} />
                                    <ValueShowingCom name="Allergic to " value={obj.allergic_to} />
                                    <ValueShowingCom name="Other Illness " value={obj.other_illness} />
                                    <hr />
                                </section>
                            ))
                        }
                    </article>
                </section>
                {/* EmployeeIdentity Identity Govrt */}
                <section className='col-lg-6 p-2 h-[40vh] my-2 '>
                    <article className='rounded-lg bgclr p-3 pt-0 h-[40vh] overflow-y-scroll w-full '>
                        <h5 className='sticky top-0 bgclr1 pt-3 pb-2' > Government Identity Details </h5>
                        {
                            employeeDetails && employeeDetails.EmployeeIdentity
                            && employeeDetails.EmployeeIdentity.map((obj, index) => (
                                <section>
                                    <ValueShowingCom name="AadharCard Number" value={obj.aadhar_no} />
                                    <ValueShowingCom name="Addhar Proof " proof={obj.aadher_proof} />
                                    <ValueShowingCom name="Name in Aadhar " value={obj.name_as_per_aadhar} />
                                    <ValueShowingCom name="Pan Number " value={obj.pan_no} />
                                    <ValueShowingCom name="Pan Proof" proof={obj.pan_proof} />
                                    <ValueShowingCom name="Passport Number" value={obj.passport_num} />
                                    <ValueShowingCom name="Passport Exp Date" value={obj.validate} />
                                    <ValueShowingCom name="Passport Proof" proof={obj.passport_proof} />
                                    <hr />
                                </section>
                            ))
                        }
                    </article>
                </section>
                {/* Last Position Held */}
                <section className='col-lg-6 p-2 h-[40vh] my-2 '>
                    <article className='rounded-lg bgclr p-3 pt-0 h-[40vh] overflow-y-scroll w-full '>
                        <h5 className='sticky top-0 bgclr1 pt-3 pb-2' > Last Position Held </h5>
                        {
                            employeeDetails && employeeDetails.LastPositionHeldDetails
                            && employeeDetails.LastPositionHeldDetails.map((obj, index) => (
                                <section>
                                    <ValueShowingCom name="Organisation" value={obj.organisation} />
                                    <ValueShowingCom name="Designation " value={obj.designation} />
                                    <ValueShowingCom name="Gross Salary   " value={obj.gross_salary_per_month} />
                                    <ValueShowingCom name="Reporting Person Name" value={obj.repoting_to_name} />
                                    <ValueShowingCom name="Reporting Person Designation " value={obj.repoting_to_designation} />
                                    <ValueShowingCom name="Reporting Person Phone" value={obj.repoting_to_phone} />
                                    <ValueShowingCom name="Reporting Person Mail" value={obj.repoting_to_email} />
                                    <hr />
                                </section>
                            ))
                        }
                    </article>
                </section>
                {/* Experience details */}
                <section className='col-lg-6 p-2 h-[40vh] my-2 '>
                    <article className='rounded-lg bgclr p-3 pt-0 h-[40vh] overflow-y-scroll w-full '>
                        <h5 className='sticky top-0 bgclr1 pt-3 pb-2' > Experience Details </h5>
                        {
                            employeeDetails && employeeDetails.ExperienceDetails && <main className='table-responsive tablebg  ' >
                                <table className='w-full p-0' >
                                    <tr className='sticky top-0 bgclr1 ' >
                                        <th>SI NO </th>
                                        <th> Organisation </th>
                                        <th>Joined Date </th>
                                        <th>Last Date </th>
                                        <th>Last position held </th>
                                        <th>Job Responsibility </th>
                                        <th>Role at Joining </th>
                                        <th>Gross Salary </th>
                                        <th>Immediate Superior </th>
                                        <th>Reason For Leaving </th>
                                    </tr>
                                    {
                                        employeeDetails.ExperienceDetails.map((obj, index) => (
                                            <tr>
                                                <td>{index + 1} </td>
                                                <td>{obj.organisation} </td>
                                                <td> {obj.from_date} </td>
                                                <td>{obj.to_date} </td>
                                                <td>{obj.last_possition_held} </td>
                                                <td>{obj.job_responsibility} </td>
                                                <td>{obj.at_the_time_of_joining} </td>
                                                <td>{obj.gross_salary_drawn} </td>
                                                <td>{obj.immediate_superior_designation} </td>
                                                <td>{obj.reason_for_leaving} </td>
                                            </tr>
                                        ))
                                    }
                                </table>

                            </main>
                        }
                    </article>
                </section>
                {/* Family Members */}
                <section className='col-lg-6 p-2 h-[40vh] my-2 '>
                    <article className='rounded-lg bgclr p-3 pt-0 h-[40vh] overflow-y-scroll w-full '>
                        <h5 className='sticky top-0 bgclr1 pt-3 pb-2' > Family Members </h5>
                        {
                            employeeDetails && employeeDetails.FamilyDetails
                            && employeeDetails.FamilyDetails.map((obj, index) => (
                                <section>
                                    <ValueShowingCom name="Name" value={obj.name} />
                                    <ValueShowingCom name="Relation " value={obj.relation} />
                                    <ValueShowingCom name="Age   " value={obj.age} />
                                    <ValueShowingCom name="Profession " value={obj.profession} />
                                    <ValueShowingCom name="DOB" value={obj.dob} />
                                    <ValueShowingCom name="Blood Group" value={obj.blood_group} />
                                    <ValueShowingCom name="Gender" value={obj.gender} />
                                    <hr />
                                </section>
                            ))
                        }
                    </article>
                </section>
            </main>

        </div>
    )
}

export default EmployeeProfile