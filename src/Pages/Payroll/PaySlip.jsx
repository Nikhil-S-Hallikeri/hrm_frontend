import React, { useContext, useEffect, useRef, useState } from 'react'
import Topnav from '../../Components/Topnav'
import { HrmStore } from '../../Context/HrmContext'
import axios from 'axios'
import { port } from '../../App'
import { useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import DownloadButton from '../../Components/Employee/DownloadButton'
import { usePDF } from 'react-to-pdf'
import DownloadContent from '../../Components/AuthPermissions/DownloadContent'
import GeneratePDF from '../../Components/ApplyList/GeneratePDF'

const PaySlip = () => {
    let { id } = useParams()
    let { getMonthYear, setActivePage, numberToWords } = useContext(HrmStore)
    let slipRef = useRef()
    let [payslip, setPayslip] = useState()
    let [loading, setLoading] = useState(false)
    let mon = new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : new Date().getMonth()
    let year = new Date().getFullYear()
    const { toPDF, targetRef } = usePDF({ Offer_Letter: 'page.pdf' });

    let [monthdata, setMonth] = useState(`${year}-${mon}`)
    let [salaryTemplate, setSalaryTemplate] = useState()
    let getTemplate = (ide) => {
        axios.get(`${port}/root/pms/SalaryTemplates?id=${ide}`).then((response) => {
            console.log("pay24", response.data);
            console.log("pay23", response.data);

            setSalaryTemplate(response.data.types)
        }).catch((error) => {
            console.log(error);
        })
    }
    let getParticularPayslip = () => {
        setLoading(true)
        axios.get(`${port}/root/pms/SingleEmployeesPaySlip/${monthdata.slice(5)}/${monthdata.slice(0, 4)}/${id}/`).then((response) => {
            setPayslip(response.data)
            setLoading(false)
            getTemplate(response.data.salary_breakups.salary_template)
            console.log("pay", response.data);
        }).catch((error) => {
            setLoading(false)
            setPayslip(null)
            console.log(error);
        })

    }
    let [otherAllowance, setOtherAllowance] = useState()
    useEffect(() => {
        if (id && monthdata)
            getParticularPayslip()
        setActivePage('payroll')
    }, [id, monthdata])
    useEffect(() => {
        if (salaryTemplate && payslip)
            changeOther()
    }, [salaryTemplate, payslip])
    let changeOther = () => {
        let total = 0
        let deductions = 0
        salaryTemplate.filter((obj, index) => obj.type == "Earning")
            .map((obj, index) => {
                console.log("hi", obj);
                if (obj.caluculate_type == 'Flat_Amount'
                    && obj.fixed_amount) {
                    total += Number(obj.fixed_amount)
                }
                else if (obj.percentage_of_ctc) {
                    total += ((obj.percentage_of_ctc / 100) * (Number(payslip.net_salary) + Number(payslip.total_deductions)))
                }
            })
        // salaryTemplate && salaryTemplate
        //     .filter((obj, index) => obj.type && (obj.type.indexOf('P') != -1))
        //     .map((obj, index) => {
        //         if (obj.caluculate_type == 'Flat_Amount'
        //             && obj.fixed_amount) {
        //             deductions += Number(obj.fixed_amount)
        //         }
        //         else if (obj.percentage_of_ctc) {
        //             deductions += ((obj.percentage_of_ctc / 100) * (Number(payslip.net_salary) + Number(payslip.total_deductions) / 12))
        //         }
        //     })

        let otherSal = (Number(payslip.net_salary) + Number(payslip.total_deductions)) > total ?
            (Number(payslip.net_salary) + Number(payslip.total_deductions)) - total : 0
        console.log(total);
        setOtherAllowance(otherSal)

    }
    return (
        <div>
            <Topnav name='Payslip' />
            <section className='my-3 ' >
                <input type="month" value={monthdata} onChange={(e) => {
                    console.log(e.target.value);
                    setMonth(e.target.value)

                }}
                    className='p-1 bgclr1 outline-none rounded ' />
            </section>
            {!loading ? payslip ?
                <main ref={slipRef} className='bg-white my-3 poppins w-full p-4 ' >
                    {/* Header */}
                    <section className='poppins flex items-center justify-between '>
                        <div className=''>
                            <img className='w-24 h-fit' src={require('../../assets/Images/merida-logo.png')}
                                alt="Logo" />

                            <span className='text-sm my-2 block '>Merida, 4th Block of Jayanagar Bengaluru Karnataka 627006 India </span>
                        </div>
                        <div>
                            <p className=' mb-1 text-sm '>Payslip For the Month </p>
                            <span className='fw-semibold '> {getMonthYear(monthdata)} </span>
                        </div>
                    </section>
                    <hr />
                    {/* Employee section */}
                    <section className='flex justify-between items-center text-sm' >
                        <article className='sm:w-1/2  ' >
                            <h6 className=' uppercase  ' >Employee Summary </h6>
                            <div className='flex    ' >
                                <p className='sm:w-1/2 '>Employee Name  </p>
                                <p>: {payslip.employee_name} </p>
                            </div>
                            <div className='flex    ' >
                                <p className='sm:w-1/2 '>Designation </p>
                                <p>: {payslip.designation} </p>
                            </div>
                            <div className='flex    ' >
                                <p className='sm:w-1/2 '>Employee ID  </p>
                                <p>: {payslip.employee_id} </p>
                            </div>
                            <div className='flex    ' >
                                <p className='sm:w-1/2 '>Date of Joining  </p>
                                <p>: {payslip.doj} </p>
                            </div>
                            {/* <div className='flex    ' >
                                <p className='sm:w-1/2 '>Pay Period  </p>
                                <p>: {getMonthYear(monthdata)} </p>
                            </div> */}
                            {/* <div className='flex    ' >
                                <p className='sm:w-1/2 '>Payslip Generated Date  </p>
                                <p>: {payslip.created_at && payslip.created_at.slice(0, 10)}  </p>
                            </div> */}
                            <div className='flex    ' >
                                <p className='sm:w-1/2 '>Bank Account Number  </p>
                                <p>: {payslip.account_number}  </p>
                            </div>
                        </article>
                        <article>
                            <div className='border rounded '>
                                <article className=' bg-green-100 p-3 ' >
                                    <div className='border-s-2 border-green-400  px-3 ' >
                                        {payslip.net_salary}
                                        <span className='block '>
                                            Employee net pay
                                        </span>
                                    </div>
                                </article>
                                <article className='p-3 ' >
                                    <div className='flex  ' >
                                        <p className='mb-1 w-[100px] '>Paid days  </p>
                                        <p className='mb-1 '> : {payslip.worked_days} </p>
                                    </div>
                                    <div className='flex '>
                                        <p className='mb-1 w-[100px] '>LOP days  </p>
                                        <p className='mb-1 '> : {payslip.lop_days && Math.round(payslip.lop_days)} </p>
                                    </div>

                                </article>
                            </div>
                        </article>
                    </section>
                    <hr />
                    {/* Structre */}
                    <section className='flex w-full justify-center gap-3' >
                        <article className='tablebg col-sm-5 rounded table-responsive ' >
                            <table className='w-full' >
                                <tr>
                                    <th>Earnings </th>
                                    <th>Amount </th>
                                </tr>
                                {
                                    salaryTemplate && salaryTemplate.filter((obj) => obj.type == "Earning")
                                        .map((obj, index) => (
                                            <tr>
                                                <td>{obj.name_in_payslip} </td>
                                                <td>{obj.caluculate_type == "Flat_Amount" ?
                                                    Number(payslip.monthly_gross_pay) != 0 ?
                                                        `₹${obj.fixed_amount}` : '₹0' : ''}
                                                    {obj.caluculate_type != "Flat_Amount" &&
                                                        `₹${(obj.percentage_of_ctc / 100) *
                                                        (Number(payslip.net_salary) + Number(payslip.total_deductions))}`
                                                    }

                                                </td>
                                            </tr>
                                        ))
                                }
                                <tr>
                                    <td>Other Allowance </td>
                                    <td> ₹{Math.round(otherAllowance)} </td>
                                </tr>
                                <tr className=' ' >
                                    <td className='bg-blue-100 rounded-s ' >Gross earning </td>
                                    <td className='bg-blue-100 rounded-e '>₹{Number(payslip.net_salary) + Number(payslip.total_deductions)} </td>
                                </tr>
                            </table>

                        </article>
                        <article className='tablebg col-sm-5 rounded table-responsive ' >
                            <table className='w-full' >
                                <tr>
                                    <th>Deduction </th>
                                    <th>Amount </th>
                                </tr>
                                {
                                    salaryTemplate && salaryTemplate.filter((obj) => obj.type && obj.type.indexOf('P') != -1)
                                        .map((obj, index) => (
                                            <tr>
                                                <td>{obj.name_in_payslip} </td>
                                                <td>{obj.caluculate_type == "Flat_Amount" ?
                                                    Number(payslip.monthly_gross_pay) != 0 ?
                                                        `₹${obj.fixed_amount}` : '₹0' : ''}
                                                    {obj.caluculate_type != "Flat_Amount" && obj.percentage_of_ctc &&
                                                        `₹${(obj.percentage_of_ctc / 100) *
                                                        (Number(payslip.net_salary) + Number(payslip.total_deductions))}`
                                                    }

                                                </td>
                                            </tr>
                                        ))
                                }
                                <tr>
                                    <td>LOP </td>
                                    <td> {Number(payslip.total_deductions) > 0 ? `₹${payslip.lop_days && Math.round(payslip.lop_days)
                                        * (Number(payslip.monthly_gross_pay) / Number(payslip.total_working_days))}` : `₹0`}
                                    </td>

                                </tr>
                                <tr className=' ' >
                                    <td className='bg-blue-100 rounded-s ' >Total Deduction </td>
                                    <td className='bg-blue-100 rounded-e '>₹{Number(payslip.total_deductions)} </td>
                                </tr>
                            </table>

                        </article>
                    </section>
                    {/* Net payable */}
                    <section className='border flex justify-between rounded my-3 '>
                        <div className='p-2 text-sm ' >
                            <p className='mb-1 fw-semibold ' > Total Net Payable </p>
                            <p className='mb-1 '>Gross Earnings - Total Deductions </p>
                        </div>
                        <div className='bg-green-100 px-3 flex rounded-e ' >
                            <p className='m-auto '> ₹{Math.round(payslip.net_salary)} </p>

                        </div>
                    </section>
                    {/* Amount In Words : Indian Rupee One Lakh Seven Thousand Four Hundred Fifty-Eight Only */}
                    <p className='ms-auto'>Amount In Words : Indian Rupee {payslip.net_salary && numberToWords(Math.round(payslip.net_salary))
                        }
                    </p>
                    <hr />
                    <p className='text-center '>-- This is a system-generated document. -- </p>

                </main> :
                <main className='h-[50vh] flex w-full  ' >
                    <div className=' m-auto bgclr1 p-5 rounded' >
                        Payslip is not generated for {getMonthYear(monthdata)}

                    </div>

                </main>
                : <main className='h-[50vh] flex w-full ' >
                    <Spinner className='m-auto' />
                </main>}
            {/* {payslip && !loading && <DownloadButton toPDF={toPDF} />} */}
            {payslip && !loading && <GeneratePDF divRef={slipRef} />}

        </div>
    )
}

export default PaySlip