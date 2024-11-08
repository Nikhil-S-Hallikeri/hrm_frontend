import React, { useContext, useEffect } from 'react'
import ClientCreation from './ClientCreation'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import ScrollButton from '../../Components/SettingComponent/ScrollButton'
import { HrmStore } from '../../Context/HrmContext'
import Topnav from '../../Components/Topnav'
import ParticularClientRecuirment from './ParticularClientRecuirment'

const ParticularClientPage = () => {
    let { id } = useParams()
    let navigate = useNavigate()
    let { setActivePage, activeSetting, setActiveSetting } = useContext(HrmStore)
    useEffect(() => {
        setActivePage('client')
    }, [])
    return (
        <div>
            <Topnav />
            <main className='flex gap-3 my-3 scrollmade overflow-x-scroll'>
                <ScrollButton activeSetting={activeSetting} setActiveSetting={setActiveSetting} name='Client Details' path={`/dash/client/${id}`} active='client' />
                <ScrollButton activeSetting={activeSetting} setActiveSetting={setActiveSetting} name='Recuirment List ' path={`/dash/client/${id}/add-recuirment`} active='requirement' />
            </main>
            <button onClick={() => navigate(`/dash/client`)} className='p-2 text-sm bg-black text-white rounded ' >
                Back  </button>
            {/* Router */}
            <Routes>
                <Route path='/*' element={<ClientCreation page='client' id={id} />} />
                <Route path='/add-recuirment' element={<ParticularClientRecuirment id={id} />} />
            </Routes>
        </div>
    )
}

export default ParticularClientPage