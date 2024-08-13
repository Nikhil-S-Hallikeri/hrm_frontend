import React, { useContext, useEffect, useState } from 'react'
import { HrmStore } from '../../Context/HrmContext'
import Topnav from '../../Components/Topnav'
import axios from 'axios'
import { port } from '../../App'
import { useNavigate } from 'react-router-dom'

const PayslipTable = () => {
    let { setActivePage } = useContext(HrmStore)
    let navigate = useNavigate()
    let [loading, setLoading] = useState()
    let mon = new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : new Date().getMonth()
    let year = new Date().getFullYear()
    let [monthdata, setMonth] = useState(`${year}-${mon}`)
    let [payslipData, setPaySlip] = useState([])
    useEffect(() => {
        setActivePage('payroll')
    }, [])
    let getPayslip = () => {
        axios.get(`${port}/root/pms/EmployeesPaySlip/${monthdata.slice(5)}/${monthdata.slice(0, 4)}/`).then((response) => {
            console.log("pay", response.data);
            if (Array.isArray(response.data))
                setPaySlip(response.data)
            else
                setPaySlip([])
        }).catch((error) => {
            console.log("pay", error);
        })
    }
    let generatePayslip = () => {
        setLoading(true)
        axios.post(`${port}/root/pms/EmployeesPaySlip/${monthdata.slice(5)}/${monthdata.slice(0, 4)}/`).then((response) => {
            console.log(response.data, "pay");
            setLoading(false)
            getPayslip()
        }).catch((error) => {
            setLoading(false)

            console.log(error);
        })
    }
    useEffect(() => {
        getPayslip()
    }, [monthdata])

    return (
        <div>
            <Topnav name='Empoyees payslip' />
            {/* Table */}
            <main className='flex justify-between ' >
                <section className='my-3 ' >
                    <input type="month" value={monthdata} onChange={(e) => {
                        console.log(e.target.value);
                        setMonth(e.target.value)

                    }}
                        className='p-1 bgclr1 outline-none rounded ' />
                </section>
                <button disabled={loading} onClick={generatePayslip} className='p-2 px-3 h-fit btngrd rounded text-white ' >
                    {loading ? 'Loading..' : "Generate Payslip"}
                </button>
            </main>
            <main className='rounded table-responsive tablebg ' >
                <table className='w-full ' >
                    <tr>
                        <th> SI No </th>
                        <th>Employee Name  </th>
                        <th>Designation </th>
                        <th>Paid days </th>
                        <th>LOP days </th>
                        <th>Account number </th>
                        <th>Gross Salary</th>
                        <th>Pay of month </th>
                        {/* <th> Earnings</th> */}
                        <th>Deduction  </th>
                        <th>Action </th>
                    </tr>
                    {
                        payslipData && payslipData.map((obj, index) => (
                            <tr>
                                <td>{index + 1} </td>
                                <td>{obj.employee_name} </td>
                                <td>{obj.designation} </td>
                                <td> {obj.worked_days} </td>
                                <td>{obj.lop_days} </td>
                                <td>{obj.account_number} </td>
                                <td>{obj.monthly_gross_pay} </td>
                                <td>{obj.net_salary} </td>
                                {/* <td>{obj.total_earnings} </td> */}
                                <td>{obj.total_deductions} </td>
                                <td>
                                    <button onClick={() => navigate(`/dash/payslip/${obj.employee_id}`)} className='text-xs bg-blue-600 text-white p-1 rounded px-3 ' >
                                        view
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                </table>

            </main>

        </div>
    )
}

export default PayslipTable