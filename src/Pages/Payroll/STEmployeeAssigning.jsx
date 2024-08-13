import React, { useContext, useEffect, useState } from 'react'
import Topnav from '../../Components/Topnav'
import axios from 'axios'
import { port } from '../../App'
import { toast } from 'react-toastify'
import { HrmStore } from '../../Context/HrmContext'
import AddSalary from '../../Components/PayrollComponent/AddSalary'

const STEmployeeAssigning = () => {
    let { setActivePage } = useContext(HrmStore)
    let [employeeList, setEmployees] = useState()
    let user = JSON.parse(sessionStorage.getItem('user'))
    let getEmployees = () => {
        axios.get(`${port}/root/ems/AllEmployeesList/${user.EmployeeId}/`).then((response) => {
            console.log(response.data);
            setEmployees(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }
    let [selectedEmployee, setSelectedEmployee] = useState([])
    let [templates, setTemplates] = useState()
    let getTemplate = () => {
        axios.get(`${port}/root/pms/SalaryTemplates`).then((response) => {
            setTemplates(response.data)
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        if (user) {
            getEmployees()
        }
        getTemplate()
        setActivePage('payroll')
    }, [])
    let assignTemplate = (e) => {
        axios.post(`${port}/root/pms/EmployeeSalaryBreakUps`, {
            employee_id: selectedEmployee.map((obj) => obj.employee_Id),
            salary_template: e.target.value
        }).then((response) => {
            toast.success('Template applied successfully')
            getEmployees()
        }).catch((error) => {
            console.log(error);
        })
    }
    let particularchange = (eid, tid) => {
        axios.post(`${port}/root/pms/EmployeeSalaryBreakUps`, {
            employee_id: [eid],
            salary_template: tid
        }).then((response) => {
            console.log(response.data);
            toast.success('Template has been assigned for the employee')
            getEmployees()
        }).catch((error) => {
            toast.error('error acquired')
            console.log(error);
        })
    }
    return (
        <div>
            <Topnav name='Template Assigning' />

            <div className='flex items-center bgclr rounded p-1 w-fit px-2 '>
                Select Template :
                <select onChange={assignTemplate} disabled={selectedEmployee.length == 0} name=""
                    className='bg-transparent outline-none ' id="">
                    <option value="">Select </option>
                    {
                        templates && templates.map((obj) => (
                            <option value={obj.id}>{obj.template_name} </option>
                        ))
                    }
                </select>

            </div>
            {/* Table of employeee */}
            <main className='tablebg table-responsive rounded my-3 ' >
                <table className='w-full' >
                    <tr className='border-b-2 border-slate-300 '>
                        <th className='flex border-0 items-center gap-1 '>
                            <input type="checkbox" id='selectall'
                                onClick={() => {
                                    if (employeeList) {
                                        if (employeeList.length == selectedEmployee.length)
                                            setSelectedEmployee([])
                                        else
                                            setSelectedEmployee(employeeList)
                                    }
                                    else
                                        toast.warning('Employees not loaded')
                                }} />
                            <label htmlFor="selectall"> Select All</label>
                        </th>
                        <th className='border-0 ' >Employee Name </th>
                        <th className='border-0 ' >Employee ID </th>
                        <th className='border-0 ' >Designation </th>
                        <th className='border-0 ' >Email  </th>
                        <th className=''>Salary </th>
                        <th className='border-0 ' >Template </th>
                    </tr>
                    {
                        employeeList && employeeList.map((obj, index) => (
                            <tr>
                                <td className='w-10 '>
                                    <input
                                        checked={selectedEmployee && selectedEmployee.find((obj2) => obj2.id == obj.id) != null}
                                        type="checkbox"
                                        onClick={() => {
                                            if (selectedEmployee && selectedEmployee.find((obj2) => obj2.id == obj.id) != null)
                                                setSelectedEmployee((prev) => prev.filter((obj2) => obj2.id != obj.id))
                                            else
                                                setSelectedEmployee((prev) => [
                                                    ...prev,
                                                    obj
                                                ])
                                        }} />
                                </td>
                                <td>{obj.full_name} </td>
                                <td>{obj.employee_Id} </td>
                                <td>{obj.Designation} </td>
                                <td>{obj.email} </td>
                                <td>{obj.salary ? obj.salary : <AddSalary id={obj.employee_Id} />} </td>
                                <td>
                                    <select name="" onChange={(e) => particularchange(obj.employee_Id, e.target.value)}
                                        className='bg-transparent outline-none '
                                        value={obj.salary_Template && obj.salary_Template.salary_template}
                                        id="">
                                        <option value="">Select </option>
                                        {
                                            templates && templates.map((obj) => (
                                                <option value={obj.id}>{obj.template_name} </option>
                                            ))
                                        }
                                    </select>

                                </td>
                            </tr>
                        ))
                    }

                </table>
            </main>

        </div>
    )
}

export default STEmployeeAssigning