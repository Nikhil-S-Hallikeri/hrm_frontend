import React, { useEffect, useState } from 'react'
import Topnav from '../../Components/Topnav'
import axios from 'axios'
import { port } from '../../App'
import { toast } from 'react-toastify'

const STEmployeeAssigning = () => {
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

    useEffect(() => {
        if (user) {
            getEmployees()
        }
    }, [])
    return (
        <div>
            <Topnav name='Template Assigning' />

            <div className='flex items-center bgclr rounded p-1 w-fit px-2 '>
                Select Template : 
                <select name="" className='bg-transparent outline-none ' id="">
                    <option value="">Select </option>
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
                                <td> </td>
                            </tr>
                        ))
                    }

                </table>
            </main>

        </div>
    )
}

export default STEmployeeAssigning