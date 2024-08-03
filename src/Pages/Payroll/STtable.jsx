import React from 'react'
import { useNavigate } from 'react-router-dom'

const STtable = () => {
    let navigate = useNavigate()
    return (
        <div>
            <button onClick={()=>navigate('/dash/salary-templates/template')} className='btngrd text-white p-2 rounded text-sm ms-auto flex my-3 '>
                Create New
            </button>
            <main className='table-responsive tablebg rounded ' >
                <table className='w-full ' >
                    <tr>
                        <th>
                            Template name
                        </th>
                        <th>Description </th>
                        <th>Status </th>
                    </tr>
                    <tr>
                        <td className='text-blue-600' >Template 1 </td>
                        <td>salary template with the Basic salary and Other salary </td>
                        <td className={` text-green-600 `}> Active </td>
                    </tr>

                </table>
            </main>

        </div>
    )
}

export default STtable