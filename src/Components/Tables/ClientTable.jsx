import React from 'react'
import { useNavigate } from 'react-router-dom'

const ClientTable = ({ data }) => {
  let navigate = useNavigate()
  return (
    <div>
      <main className={` tablebg table-responsive my-3 rounded  `}>
        <table className='w-full ' >
          <tr>
            <th>SI NO </th>
            <th>Client ID</th>
            <th>Client Name </th>
            <th>Client Phone No </th>
            <th>Email </th>
            <th> Company Name </th>
            <th> GST No  </th>
            <th>  </th>
            <th>  </th>
          </tr>
          {
            data && data.map((obj, index) => (
              <tr onClick={() => navigate(`/dash/client/${obj.id}`)} className=' hover:bg-slate-100 cursor-pointer ' >
                <td>{index + 1} </td>
                <td>{obj.client_id} </td>
                <td> {obj.client_name} </td>
                <td> {obj.client_phone} </td>
                <td>{obj.client_email} </td>
                <td> {obj.company_name} </td>
                <td>{obj.gst_number} </td>
                <td></td>
                <td></td>
              </tr>
            ))
          }

        </table>
      </main>
    </div>
  )
}

export default ClientTable