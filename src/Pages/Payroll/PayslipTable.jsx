import React, { useContext, useEffect, useState } from 'react'
import { HrmStore } from '../../Context/HrmContext'
import Topnav from '../../Components/Topnav'
import axios from 'axios'
import { port } from '../../App'
import { useNavigate } from 'react-router-dom'
import LoadingData from '../../Components/MiniComponent/LoadingData'

const PayslipTable = () => {
    let { setActivePage, setTopNav } = useContext(HrmStore)
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
        setLoading('data')
        axios.get(`${port}/root/pms/EmployeesPaySlip/${monthdata.slice(5)}/${monthdata.slice(0, 4)}/`).then((response) => {
            console.log("pay", response.data);
            if (Array.isArray(response.data))
                setPaySlip(response.data)
            else
                setPaySlip([])
            setLoading(false)
        }).catch((error) => {
            console.log("pay", error);
            setLoading(false)
        })
    }
    let generatePayslip = () => {
        setLoading('payslip')
        axios.post(`${port}/root/pms/EmployeesPaySlip/${monthdata.slice(5)}/${monthdata.slice(0, 4)}/`).then((response) => {
            console.log(response.data, "pay");
            setLoading(false)
            getPayslip()
        }).catch((error) => {
            setLoading(false)

            console.log(error);
        })
    }
    let downloadPayslip = () => {
        setLoading('download')
        axios.get(`${port}/root/pms/DownloadEmployeePaySlipExcel/${monthdata.slice(5)}/${monthdata.slice(0, 4)}/`,
            {
                responseType: 'blob'
            }).then((response) => {
                console.log(response.data, 'Download');
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Payslip.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                setLoading(false)
            }).catch((error) => {
                console.log(error, 'Download');
                setLoading(false)
            })
    }
    useEffect(() => {
        getPayslip()
        setTopNav('allpayslip')
    }, [monthdata])

    return (
        <div>
            {/* <Topnav name='Empoyees payslip' /> */}
            {/* Table */}
            <main className='flex justify-between items-center' >
                <section className='my-3 ' >
                    <input type="month" value={monthdata} onChange={(e) => {
                        console.log(e.target.value);
                        setMonth(e.target.value)

                    }}
                        className='p-1 bgclr1 px-2 bg-white outline-none rounded ' />
                </section>
                <div>
                    <button disabled={loading == 'payslip'} onClick={generatePayslip} className='p-2 mx-3 px-3 h-fit btngrd rounded text-white ' >
                        {loading == 'payslip' ? 'Loading..' : "Generate Payslip"}
                    </button>
                    <button onClick={downloadPayslip} disabled={loading == 'download'}
                        className='bg-slate-600 text-slate-50 p-2 rounded px-3 ' >
                        {loading == 'download' ? 'Loading..' : "Download"}
                    </button>
                </div>
            </main>
            <main className='rounded table-responsive h-[80vh] tablebg ' >
                <table className='w-full ' >
                    <tr className='sticky top-0 bg-white shadow-sm ' >
                        <th> SI No </th>
                        <th>Employee Name  </th>
                        <th>Designation </th>
                        <th>Paid days </th>
                        <th>LOP days </th>
                        <th>Bank Account No</th>
                        <th>Gross Salary</th>
                        <th>Salary for the month </th>
                        {/* <th> Earnings</th> */}
                        <th>Deductions  </th>
                        <th>Payslip </th>
                    </tr>
                    {
                        loading != 'data' && payslipData && payslipData.map((obj, index) => (
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
                                    <button onClick={() => navigate(`/payroll/payslip/${obj.employee_id}`)} className='text-xs bg-blue-600 text-white p-1 rounded px-3 ' >
                                        view
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                </table>
                {loading == 'data' && <LoadingData />}
            </main>

        </div>
    )
}

export default PayslipTable