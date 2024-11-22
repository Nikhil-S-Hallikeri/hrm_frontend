import React, { useContext } from 'react'
import { HrmStore } from '../../Context/HrmContext'

const EmployeeTable = ({ data, css }) => {
    let { changeDateYear } = useContext(HrmStore)
    return (
        <div>
            {data && data.length > 0 ? <main className={` tablebg  ${css ? css : "h-[30vh]"} rounded table-responsive`} >
                {console.log(data, 'modal')
                }
                <table className='w-full ' >
                    <tr className=' sticky top-0 bg-white ' >
                        <th>SI No </th>
                        <th>Employee Id </th>
                        <th> Employee name </th>
                        {data[0].from_date && <th>Leave Start date </th>}
                        {data[0].date_of_birth && <th>Date of Brith</th>}
                        {data[0].hired_date && <th>Joined Date </th>}
                        <th> Department </th>
                        <th>Designation </th>

                    </tr>

                    {
                        data && data.map((obj, index) => (
                            <tr>
                                <td>{index + 1} </td>
                                <td> {obj.employee_Id || obj.employee} </td>
                                <td> {obj.full_name || obj.employee_name} </td>
                                {data[0].from_date && <td> {obj.from_date && changeDateYear(obj.from_date)} </td>}
                                {data[0].date_of_birth && <td> {obj.date_of_birth && changeDateYear(obj.date_of_birth)} </td>}
                                {data[0].hired_date && <td> {obj.hired_date && changeDateYear(obj.hired_date)} </td>}
                                <td> {obj.Department} </td>
                                <td> {obj.Designation} </td>

                            </tr>
                        ))
                    }
                </table>
            </main> :
                <main className={` ${css ? css : "h-[30vh]"} flex items-center justify-between `} >
                    <div className='w-fit mx-auto ' >

                        <img src={require('../../assets/Images/nodatafound.png')} alt="NotFoundData" className=' w-[10rem] my-2' />
                        <p className='mb-0 w-fit mx-auto text-center ' >No data Found </p>
                    </div>
                </main>
            }
        </div>
    )
}

export default EmployeeTable