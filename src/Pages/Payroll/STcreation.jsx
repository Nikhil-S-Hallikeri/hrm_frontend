import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InputFieldform from '../../Components/SettingComponent/InputFieldform'
import InfoButton from '../../Components/SettingComponent/InfoButton'

const STcreation = () => {
    let { id } = useParams()
    let navigate = useNavigate()
    let [salaryTemplate, setSalaryTemplate] = useState()
    return (
        <div className='poppins '>
            {id ?
                <div>
                    Template name
                </div>
                : <h5>New Salary Template </h5>}
            <main className=' formbg rounded p-4 row ' >
                <InputFieldform label='Template Name' />
                <InputFieldform label='Description' type='textarea' placeholder='Max 500 characters' />
            </main>
            <main className='formbg rounded my-3 p-4 row ' >
                <div className='flex gap-1 items-center '>
                    Annual CTC <InfoButton content='This is feild is for checking purpose , you can check it with various CTC for your designed template. ' size={10} />
                    <input type="number" placeholder='' className='bgclr mx-3 p-2 rounded outline-none ' />
                    per year
                </div>
                <section className='table-responsive tablebg my-3 rounded ' >
                    <table className='w-full ' >
                        <tr>
                            <th>Salary Components</th>
                            <th> Calculation type </th>
                            <th>Monthly amount</th>
                            <th>Annual amount </th>
                        </tr>
                        <tr>
                            <td className='fw-semibold text-xl '>Earnings </td>
                        </tr>
                        <tr>
                            <td>Basic </td>
                            <td className=' '>
                                <div className='rounded mx-auto border-2 w-fit'>
                                    <input type="number" className='rounded outline-none p-2 w-20 ' />
                                    <span> % of CTC </span>
                                </div>
                            </td>
                            <td>5000 </td>
                            <td>34000 </td>
                        </tr>


                        {/* Fixed Allowance */}
                        <tr>
                            <td className='text-start'>
                                <span className='flex gap-1'>
                                    Fixed Allowance
                                    <InfoButton size={12} content='Fixed allowance is a residual component of
                                     salary that is left after allocations are made for all other components.' />
                                </span>
                                <span className='text-sm '>
                                    Monthly CTC - Sum of all other components
                                </span>
                            </td>
                            <td>Fixed </td>
                            <td>5000 </td>
                            <td>60000 </td>
                        </tr>
                        <tr>
                            <td className='fw-semibold text-xl '>Deductions</td>
                        </tr>
                        <tr>
                            <td>Pre Deduction1 - Employer Contribution</td>
                            <td>
                                <div className='rounded mx-auto border-2 w-fit'>
                                    <input type="number" className='rounded outline-none p-2 w-20 ' />
                                    <select className='bg-transparent outline-none '>
                                        <option value="percentage"> % of CTC </option>
                                        <option value="fixed">Fixed Amount </option>
                                    </select>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        {/* Total */}
                        <tr className='bg-blue-50 '>
                            <td>
                                Cost to Company
                            </td>
                            <td></td>
                            <td>₹10000 </td>
                            <td>₹20000 </td>
                        </tr>

                    </table>
                </section>
                <div className='flex justify-end '>

                    <button onClick={() => alert('helow')} className='savebtn text-white rounded p-2 px-3 text-sm '>
                        Save
                    </button>
                    <button onClick={() => navigate('/dash/salary-templates/')} className='mx-2 p-2 px-3 bg-slate-500 text-white rounded text-sm ' >
                        Cancel
                    </button>

                </div>
            </main>

        </div>
    )
}

export default STcreation