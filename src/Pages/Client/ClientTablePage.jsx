import React, { useContext, useEffect, useState } from 'react'
import Topnav from '../../Components/Topnav'
import ClientTable from '../../Components/Tables/ClientTable'
import { useNavigate } from 'react-router-dom'
import { HrmStore } from '../../Context/HrmContext'
import axios from 'axios'
import { port } from '../../App'

const ClientTablePage = () => {
  let navigate = useNavigate()
  let { activePage, setActivePage } = useContext(HrmStore)
  let [allClients, setAllClients] = useState()
  useEffect(() => {
    setActivePage('client')
    getAllClients()
  }, [])
  let getAllClients = () => {
    axios.get(`${port}/root/cms/clients`).then((response) => {
      setAllClients(response.data)
      console.log(response.data, 'client');

    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div>
      <Topnav />

      <section className='flex justify-between items-center gap-3 ' >
        <h5 className=' ' > All the Clients </h5>
        <button onClick={() => navigate(`/dash/addClient`)} className='bg-blue-600 text-white rounded p-2 text-sm ' >Add Client </button>
      </section>
      <ClientTable data={allClients} />

    </div>
  )
}

export default ClientTablePage