import React, { useContext, useEffect, useState } from 'react'
import { HrmStore } from '../../Context/HrmContext'
import ClientRequirmentTable from '../../Components/Tables/ClientRequirmentTable'
import RecuirementaddingModal from './RecuirementaddingModal'

const ParticularClientRecuirment = ({id}) => {
    let { setActiveSetting } = useContext(HrmStore)
    let [show, setShow] = useState(false)
    useEffect(() => {
        setActiveSetting('requirement')
    }, [])
    return (
        <div>

            <ClientRequirmentTable />
            <button onClick={() => setShow(true)} className='flex ms-auto p-2 rounded bg-blue-700 text-white  text-sm ' >
                Add Recuirment  </button>
            <RecuirementaddingModal cid={id} show={show} setshow={setShow} />
        </div>
    )
}

export default ParticularClientRecuirment